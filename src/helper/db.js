const mongoose = await import('mongoose');
const dotenv = await import('dotenv');
dotenv.config();

export const connection = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URI || 'mongodb://localhost:27017/test'
    );
    console.log('connection success');
  } catch (error) {
    console.log(error);
  }
};
