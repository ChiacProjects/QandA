const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-in-production';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ detail: 'Could not validate credentials' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ id: decoded.sub });

    if (!user) {
      return res.status(401).json({ detail: 'Could not validate credentials' });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      reputation: user.reputation,
      created_at: user.created_at
    };

    next();
  } catch (error) {
    return res.status(401).json({ detail: 'Could not validate credentials' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ id: decoded.sub });

    if (user) {
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        reputation: user.reputation,
        created_at: user.created_at
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = { authenticateToken, optionalAuth, SECRET_KEY };