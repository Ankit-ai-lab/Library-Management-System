const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const User = require('../models/User');
const fineCalculator = require('../utils/fineCalculator');

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if(!book || !book.available) return res.status(400).json({ message: 'Book not available' });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks by default

    const borrow = await Borrow.create({
      user: req.user.id,
      book: book._id,
      dueDate
    });

    // Update book availability
    book.available = false;
    await book.save();

    // Add borrow to user
    const user = await User.findById(req.user.id);
    user.borrowedBooks.push(borrow._id);
    await user.save();

    res.status(201).json(borrow);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.borrowId).populate('book');
    if(!borrow) return res.status(404).json({ message: 'Borrow record not found' });
    if(borrow.returnedAt) return res.status(400).json({ message: 'Book already returned' });

    borrow.returnedAt = new Date();
    borrow.finePaid = fineCalculator(borrow.dueDate, borrow.returnedAt);
    await borrow.save();

    // Update book availability
    const book = await Book.findById(borrow.book._id);
    book.available = true;
    await book.save();

    res.json({ message: 'Book returned', fine: borrow.finePaid });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all borrowed books of user
exports.getUserBorrowedBooks = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user.id }).populate('book');
    res.json(borrows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
