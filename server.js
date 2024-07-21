const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { fileStorage, fileFilter } = require('./src/helper/multer');

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

app.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Missing authorization credentials',
    });
  } else if (err && err?.errorCode) {
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => {
    app.listen(4000, () => console.log('connection success'));
  })
  .catch((err) => console.log(err));
