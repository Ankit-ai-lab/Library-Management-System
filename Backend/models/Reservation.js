const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  reservedAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false } // If user is notified book is available
});

module.exports = mongoose.model('Reservation', reservationSchema);
