import { config } from '../config/index.js';
const mongoose = await import('mongoose');

// Function to connect to the database
export const connection = async () => {
  try {
    await mongoose.connect(
      config.DATABASE_URI || 'mongodb://localhost:27017/test'
    );
    console.log('connection success');
  } catch (error) {
    console.log(error);
  }
};
