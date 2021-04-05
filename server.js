const express = require("express");
const productRoutes = require("./routes/products");
const app = express();
const cors = require("cors");

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

app.use("/v1/customer", productRoutes);

app.listen(4000);
