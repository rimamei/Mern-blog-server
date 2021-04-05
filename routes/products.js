const express = require("express");
const productsController = require("../controllers/products");

const router = express.Router();

router.post("/product", productsController.createProduct);
router.get("/product", productsController.getAllProduct);

module.exports = router;
