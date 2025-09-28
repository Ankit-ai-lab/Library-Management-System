const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'librarian'], default: 'user' },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Borrow' }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  activityLog: [{ type: String }], // Track actions like borrowed, reviews, events
}, { timestamps: true });

// Password hashing before saving


userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.paaaword,salt)
next();

})
// Password verification
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
