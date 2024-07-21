import multer from 'multer';

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

export const removeImage = (filepath) => {
  console.log('filepath: ', filepath);
  console.log('dir name: ', __dirname);

  filepath = path.join(__dirname, '../..', filepath);
  console.log(filepath);
  fs.unlink(filepath, (err) => console.log(err));
};
