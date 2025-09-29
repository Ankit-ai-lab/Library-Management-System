const express = require('express');
const router = express.Router();
const { 
  borrowBook, returnBook, getUserBorrowedBooks 
} = require('../controllers/borrowController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Borrow a book
router.post('/borrow/:bookId', authMiddleware, borrowBook);

// Return a book
router.post('/return/:borrowId', authMiddleware, returnBook);

// Get current user's borrowed books
router.get('/my', authMiddleware, getUserBorrowedBooks);

module.exports = router;
