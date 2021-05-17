const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true,
      lowwercase: true,
      validator: [validator.isEmail, 'Please enter a valid email address'],
    },
    phone: {
      type: Number,
      unique: true,
      required: [true, 'Please enter your phone number'],
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// schema mthods which is being used in user login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
