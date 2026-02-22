const mongoose = require('mongoose');

const questionVoteSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    required: true,
    enum: [-1, 1]
  }
});

const answerVoteSchema = new mongoose.Schema({
  answer_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    required: true,
    enum: [-1, 1]
  }
});

questionVoteSchema.index({ question_id: 1, user_id: 1 }, { unique: true });
answerVoteSchema.index({ answer_id: 1, user_id: 1 }, { unique: true });

const QuestionVote = mongoose.model('QuestionVote', questionVoteSchema);
const AnswerVote = mongoose.model('AnswerVote', answerVoteSchema);

module.exports = { QuestionVote, AnswerVote };