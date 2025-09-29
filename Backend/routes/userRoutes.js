const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Get own profile
router.get('/profile', authMiddleware, getUserProfile);

// Update profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
