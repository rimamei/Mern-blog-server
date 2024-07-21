import authRoutes from './src/routes/auth';
import blogRoutes from './src/routes/blog';
import express from 'express';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { fileStorage, fileFilter } from './src/helper/multer';
import cors from 'cors';

const app = express();

// parse application/json
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use(cors());

// Routing for API
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.DATABASE_URI || 'mongodb://localhost:27017/test')
  .then(() => {
    console.log('connection success');
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 4000);
