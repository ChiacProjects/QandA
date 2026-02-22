const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user by ID
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({ id: user_id }).lean();
    if (!user) {
      return res.status(404).json({ detail: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      reputation: user.reputation,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ detail: 'Failed to fetch user' });
  }
});

module.exports = router;