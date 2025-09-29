const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ 
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if(!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
