const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const mongoose = require("mongoose");

const app = express();

// parse application/json
app.use(bodyParser.json());

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
