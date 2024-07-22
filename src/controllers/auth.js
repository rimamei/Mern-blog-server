import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { response } from '../utils/response.js';
import { generateToken } from '../helper/jwt.js';
import { validationResult } from 'express-validator';

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error(errors?.array()[0]?.msg ?? 'Invalid Input');
      err.status = 400;
      err.data = null;
      throw err;
    }

    const { name, email, password, isVerified } = req.body;

    // Check if email already exist in db
    const user = await User.findOne({ email });

    // If email already exist, throw error
    if (user) {
      const err = new Error('Email already exist');
      err.status = 401;
      err.data = null;
      throw err;
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      isVerified,
    });

    // Save new user to db
    const createdUser = await newUser.save();

    // Send success response
    response(res, createdUser, 201, 'User created successfully');
  } catch (err) {
    // Send error response
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error(errors?.array()[0]?.msg ?? 'Invalid Input');
      err.status = 400;
      err.data = null;
      throw err;
    }

    const { email, password } = req.body;

    // Check if email already exist in db
    const user = await User.findOne({ email });

    // Check if password is correct
    const isMatch = bcrypt.compareSync(password, user.password);

    // If user and password is correct, generate token
    if (user && isMatch) {
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      };
      // Send success response
      response(res, data, 200, "You've successfully sign in!");
    } else {
      // If user and password is incorrect, throw error
      const err = new Error('Invalid email or password');
      err.status = 401;
      err.data = null;
      throw err;
    }
  } catch (err) {
    // Send error response
    next(err);
  }
};
