const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  votes: {
    type: Number,
    default: 0
  },
  answer_count: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Question', questionSchema);