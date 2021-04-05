const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

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
  res.status(400).json({ message: "Error", data: "data disini" });
});

app.listen(4000);
