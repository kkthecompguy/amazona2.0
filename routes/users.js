const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const isAuthenticated = require('../middleware/auth');
const config = require('../config');


// @route /api/users/signin
// @desc sign in user
// @access Public
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload  = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    }

    jwt.sign(payload, config.JWT_SECRECT_KEY, {
      expiresIn: '1h'
    }, (error, token) => {
      if (error) {
        throw error
      } else {
        res.status(200).json({...payload, token: token});
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message});
  }
});



// @route /api/users/signin
// @desc sign in user
// @access Public
router.get('/signup', async (req, res) => {
  try {
    const newUser = User({
      name: "Sam Sean",
      email: "kosamdjango@gmail.com",
      password: "qwerty2020",
      isAdmin: true
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);

    const user = await newUser.save();
    
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    }

    jwt.sign(payload, config.JWT_SECRECT_KEY, {
      expiresIn: "1h"
    }, (error, token) => {
      if (error) {
        throw error;
      } else {
        return res.status(200).json({...payload, token: token});
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;