const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);
  user.token = token;
  await user.save();
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user,
  });
};

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already registered',
      });
    }
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
      password: req.body.password,
    });
    newUser.password = await bcrypt.hash(req.body.password, 12);
    await newUser.save();
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // This login API is prepared keeping in mind user can use both
    // (phone and password) & (email and password)
    const userId = req.body.userId;
    const password = req.body.password;
    // Regular expression to check if user has used phone or email
    const reg = /^\d+$/;
    // If user has used phone
    if (reg.test(userId)) {
      const user = await User.findOne({ phone: userId });
      if (!user || !(await user.correctPassword(password, user.password))) {
        res.send('Username or password is incorrect');
      }
      res.status(200).json({
        status: 'success',
        user: user,
      });
    } else {
      // if user has used email
      const user = await User.findOne({ email: userId });
      if (!user || !(await user.correctPassword(password, user.password))) {
        res.send('Username or password is incorrect');
      }
      createSendToken(user, 200, req, res);
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(400).json({
        status: 'fail',
        message: 'User not authenticated',
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
