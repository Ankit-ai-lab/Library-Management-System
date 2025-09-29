const User = require('../models/User');
const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Get all borrow records
exports.getAllBorrows = async (req, res) => {
  const borrows = await Borrow.find().populate('user').populate('book');
  res.json(borrows);
};

// Reports (most borrowed books, fines, etc.)
exports.getReports = async (req, res) => {
  const mostBorrowedBooks = await Book.find().sort({ borrowedCount: -1 }).limit(5);
  const totalFines = await Borrow.aggregate([
    { $group: { _id: null, total: { $sum: "$finePaid" } } }
  ]);

  res.json({ mostBorrowedBooks, totalFines: totalFines[0]?.total || 0 });
};
