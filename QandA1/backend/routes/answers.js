const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const { AnswerVote } = require('../models/Vote');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Vote on answer
router.post('/:answer_id/vote', authenticateToken, async (req, res) => {
  try {
    const { answer_id } = req.params;
    const { vote } = req.body;

    const answer = await Answer.findOne({ id: answer_id });
    if (!answer) {
      return res.status(404).json({ detail: 'Answer not found' });
    }

    const existingVote = await AnswerVote.findOne({
      answer_id,
      user_id: req.user.id
    });

    let voteChange = 0;

    if (existingVote) {
      const oldVote = existingVote.vote;
      if (vote === 0) {
        await AnswerVote.deleteOne({ answer_id, user_id: req.user.id });
        voteChange = -oldVote;
      } else {
        existingVote.vote = vote;
        await existingVote.save();
        voteChange = vote - oldVote;
      }
    } else {
      if (vote !== 0) {
        await AnswerVote.create({
          answer_id,
          user_id: req.user.id,
          vote
        });
        voteChange = vote;
      }
    }

    // Update answer votes
    answer.votes += voteChange;
    await answer.save();

    // Update user reputation
    if (voteChange !== 0) {
      await User.updateOne(
        { id: answer.user_id },
        { $inc: { reputation: voteChange * 10 } }
      );
    }

    res.json({ votes: answer.votes, user_voted: vote });
  } catch (error) {
    console.error('Vote answer error:', error);
    res.status(500).json({ detail: 'Failed to vote' });
  }
});

// Accept answer
router.post('/:answer_id/accept', authenticateToken, async (req, res) => {
  try {
    const { answer_id } = req.params;

    const answer = await Answer.findOne({ id: answer_id });
    if (!answer) {
      return res.status(404).json({ detail: 'Answer not found' });
    }

    const question = await Question.findOne({ id: answer.question_id });
    if (question.user_id !== req.user.id) {
      return res.status(403).json({ detail: 'Only question owner can accept answers' });
    }

    // Unaccept all other answers
    await Answer.updateMany(
      { question_id: answer.question_id },
      { is_accepted: false }
    );

    // Accept this answer
    answer.is_accepted = true;
    await answer.save();

    // Give reputation bonus
    await User.updateOne(
      { id: answer.user_id },
      { $inc: { reputation: 15 } }
    );

    res.json({ message: 'Answer accepted' });
  } catch (error) {
    console.error('Accept answer error:', error);
    res.status(500).json({ detail: 'Failed to accept answer' });
  }
});

module.exports = router;