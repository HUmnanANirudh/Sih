const express = require('express');
const router = express.Router();
const User = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin and Seller Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username matches 'T-800' for admin
    if (username === 'T-800') {
      const admin = await User.findOne({ username });

      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      if (admin.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
      }

      // Generate token for admin
      const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: 'admin' });
    }

    // Else, check for sellers
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check for seller role
    if (user.role === 'seller') {
      const token = jwt.sign({ id: user._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: 'seller' });
    } else {
      return res.status(403).json({ msg: 'Access denied' });
    }

  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

module.exports = router;
