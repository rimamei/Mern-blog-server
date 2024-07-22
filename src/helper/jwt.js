import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

// Function to generate token
export const generateToken = (user) => {
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };

  return jwt.sign(data, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};
