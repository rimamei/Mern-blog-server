import authRoutes from './src/routes/auth.js';
import blogRoutes from './src/routes/blog.js';
import express from 'express';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { fileStorage, fileFilter } from './src/helper/multer.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connection } from './src/helper/db.js';

dotenv.config();

const app = express();

// Define __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// parse application/json
app.use(express.json());

// image path
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

connection();

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
});
