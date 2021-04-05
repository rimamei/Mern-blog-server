const express = require("express");
const { body } = require("express-validator");
const blogController = require("../controllers/blog");

const router = express.Router();

// [POST] : /v1/blog/post
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Title kurang dari 5 huruf"),
    body("body").isLength({ min: 5 }).withMessage("Body kurang dari 5 huruf"),
  ],
  blogController.createBlog
);

module.exports = router;
