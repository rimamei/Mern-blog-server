const express = require("express");
const productRoutes = require("./routes/products");
const app = express();

app.use("/", productRoutes);

app.listen(4000);
