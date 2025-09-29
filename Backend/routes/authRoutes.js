const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user & return JWT
router.post('/login', loginUser);

module.exports = router;
