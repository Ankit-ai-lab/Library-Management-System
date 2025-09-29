const express = require('express');
const router = express.Router();
const { 
  getBooks, getBookById, addBook, updateBook, deleteBook 
} = require('../controllers/bookController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

// @route   GET /api/books
router.get('/', getBooks);

// @route   GET /api/books/:id
router.get('/:id', getBookById);

// Only librarians can manage books
router.post('/', authMiddleware, roleMiddleware('librarian'), addBook);
router.put('/:id', authMiddleware, roleMiddleware('librarian'), updateBook);
router.delete('/:id', authMiddleware, roleMiddleware('librarian'), deleteBook);

module.exports = router;
