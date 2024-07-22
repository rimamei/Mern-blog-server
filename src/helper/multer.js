import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

export const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const removeImage = (file) => {
  // Helper to get the root directory
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootDir = path.resolve(__dirname, '../..');

  // Define file path
  const filepath = path.join(rootDir, '', file);

  // Remove image
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Image deleted', filepath);
    }
  });
};
