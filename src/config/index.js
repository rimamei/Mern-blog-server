import dotenv from 'dotenv';

dotenv.config();

// Env Configuration
export const config = {
  PORT: process.env.PORT || 4000,
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://localhost:27017/test',
};
