import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { config } from '../config/index.js';

// Function to protect routes
export const protect = async (req, res, next) => {
  // Define token
  let token;

  // Check if token is provided
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);

      // Find user by id
      const user = await User.findOne({ _id: decoded?._id });

      // add user to req object
      req.user = user;

      // Call next middleware
      next();
    } catch (error) {
      // If token is invalid
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If token is not provided
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
