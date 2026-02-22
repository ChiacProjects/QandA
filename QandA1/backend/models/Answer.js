const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  question_id: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  is_accepted: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    default: () => new Date().toISOString()
  }
});

module.exports = mongoose.model('Answer', answerSchema);