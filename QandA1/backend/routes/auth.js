const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authenticateToken, SECRET_KEY } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const createAccessToken = (userId) => {
  return jwt.sign(
    { sub: userId },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
};

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ detail: 'Email or username already registered' });
    }

    // Create user
    const userId = uuidv4();
    const user = new User({
      id: userId,
      username,
      email,
      password_hash: password,
      reputation: 0,
      created_at: new Date().toISOString()
    });

    await user.save();

    // Create token
    const access_token = createAccessToken(userId);

    res.json({
      access_token,
      token_type: 'bearer',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        reputation: user.reputation,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ detail: 'Failed to create account' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const access_token = createAccessToken(user.id);

    res.json({
      access_token,
      token_type: 'bearer',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        reputation: user.reputation,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ detail: 'Failed to login' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;