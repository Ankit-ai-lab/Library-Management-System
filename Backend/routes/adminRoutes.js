const express = require('express');
const router = express.Router();
const { getAllUsers, getAllBorrows, getReports } = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

// Only librarians/admins
router.use(authMiddleware, roleMiddleware('librarian'));

// Get all users
router.get('/users', getAllUsers);

// Get all borrow records
router.get('/borrows', getAllBorrows);

// Reports (most borrowed books, fines, etc.)
router.get('/reports', getReports);

module.exports = router;
