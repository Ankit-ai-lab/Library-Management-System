const Book = require('../models/Book');

// Get all books (with optional search/filter)
exports.getBooks = async (req, res) => {
  try {
    const { search, genre, author } = req.query;
    let query = {};
    if(search) query.title = { $regex: search, $options: 'i' };
    if(genre) query.genre = genre;
    if(author) query.author = author;

    const books = await Book.find(query).populate('reviews');
    res.json(books);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if(!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new book (librarian only)
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if(!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
