const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const { QuestionVote } = require('../models/Vote');
const User = require('../models/User');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Create question
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const questionId = uuidv4();
    const question = new Question({
      id: questionId,
      title,
      description,
      tags,
      votes: 0,
      answer_count: 0,
      user_id: req.user.id,
      username: req.user.username,
      created_at: new Date().toISOString()
    });

    await question.save();

    res.json({
      id: question.id,
      title: question.title,
      description: question.description,
      tags: question.tags,
      votes: question.votes,
      answer_count: question.answer_count,
      user_id: question.user_id,
      username: question.username,
      created_at: question.created_at,
      user_voted: 0
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({ detail: 'Failed to create question' });
  }
});

// Get all questions
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    const questions = await Question.find(query).sort({ votes: -1 }).lean();

    // Add user vote status
    if (req.user) {
      for (let question of questions) {
        const vote = await QuestionVote.findOne({
          question_id: question.id,
          user_id: req.user.id
        });
        question.user_voted = vote ? vote.vote : 0;
      }
    } else {
      questions.forEach(q => q.user_voted = 0);
    }

    res.json(questions);
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ detail: 'Failed to fetch questions' });
  }
});

// Get question by ID
router.get('/:question_id', optionalAuth, async (req, res) => {
  try {
    const { question_id } = req.params;

    const question = await Question.findOne({ id: question_id }).lean();
    if (!question) {
      return res.status(404).json({ detail: 'Question not found' });
    }

    // Get answers
    const answers = await Answer.find({ question_id }).lean();

    // Sort answers: accepted first, then by votes
    answers.sort((a, b) => {
      if (a.is_accepted !== b.is_accepted) {
        return b.is_accepted - a.is_accepted;
      }
      return b.votes - a.votes;
    });

    // Add user vote status
    if (req.user) {
      const qVote = await QuestionVote.findOne({
        question_id,
        user_id: req.user.id
      });
      question.user_voted = qVote ? qVote.vote : 0;

      for (let answer of answers) {
        const { AnswerVote } = require('../models/Vote');
        const aVote = await AnswerVote.findOne({
          answer_id: answer.id,
          user_id: req.user.id
        });
        answer.user_voted = aVote ? aVote.vote : 0;
      }
    } else {
      question.user_voted = 0;
      answers.forEach(a => a.user_voted = 0);
    }

    question.answers = answers;

    res.json(question);
  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({ detail: 'Failed to fetch question' });
  }
});

// Create answer
router.post('/:question_id/answers', authenticateToken, async (req, res) => {
  try {
    const { question_id } = req.params;
    const { content } = req.body;

    const question = await Question.findOne({ id: question_id });
    if (!question) {
      return res.status(404).json({ detail: 'Question not found' });
    }

    const answerId = uuidv4();
    const answer = new Answer({
      id: answerId,
      content,
      question_id,
      votes: 0,
      is_accepted: false,
      user_id: req.user.id,
      username: req.user.username,
      created_at: new Date().toISOString()
    });

    await answer.save();

    // Update answer count
    question.answer_count += 1;
    await question.save();

    res.json({
      id: answer.id,
      content: answer.content,
      question_id: answer.question_id,
      votes: answer.votes,
      is_accepted: answer.is_accepted,
      user_id: answer.user_id,
      username: answer.username,
      created_at: answer.created_at,
      user_voted: 0
    });
  } catch (error) {
    console.error('Create answer error:', error);
    res.status(500).json({ detail: 'Failed to create answer' });
  }
});

// Vote on question
router.post('/:question_id/vote', authenticateToken, async (req, res) => {
  try {
    const { question_id } = req.params;
    const { vote } = req.body;

    const question = await Question.findOne({ id: question_id });
    if (!question) {
      return res.status(404).json({ detail: 'Question not found' });
    }

    const existingVote = await QuestionVote.findOne({
      question_id,
      user_id: req.user.id
    });

    let voteChange = 0;

    if (existingVote) {
      const oldVote = existingVote.vote;
      if (vote === 0) {
        await QuestionVote.deleteOne({ question_id, user_id: req.user.id });
        voteChange = -oldVote;
      } else {
        existingVote.vote = vote;
        await existingVote.save();
        voteChange = vote - oldVote;
      }
    } else {
      if (vote !== 0) {
        await QuestionVote.create({
          question_id,
          user_id: req.user.id,
          vote
        });
        voteChange = vote;
      }
    }

    // Update question votes
    question.votes += voteChange;
    await question.save();

    // Update user reputation
    if (voteChange !== 0) {
      await User.updateOne(
        { id: question.user_id },
        { $inc: { reputation: voteChange * 5 } }
      );
    }

    res.json({ votes: question.votes, user_voted: vote });
  } catch (error) {
    console.error('Vote question error:', error);
    res.status(500).json({ detail: 'Failed to vote' });
  }
});

module.exports = router;
