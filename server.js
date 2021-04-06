const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// parse application/json
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// Adding CORS
// app.use((req, res, next) => {
//   res.setHeader("Acces-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Acces-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.setHeader("Acces-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors());

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    app.listen(4000, () => console.log("connection success"));
  })
  .catch((err) => console.log(err));
