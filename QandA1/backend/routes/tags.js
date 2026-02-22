const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get popular tags
router.get('/', async (req, res) => {
  try {
    const tags = await Question.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json(tags.map(tag => ({
      name: tag._id,
      count: tag.count
    })));
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ detail: 'Failed to fetch tags' });
  }
});

module.exports = router;