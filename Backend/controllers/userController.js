const User = require('../models/User');

// Get own profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('borrowedBooks')
      .populate('reservations');
    res.json(user);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Update profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(user);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
