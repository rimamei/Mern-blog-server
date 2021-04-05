const { validationResult } = require("express-validator");

exports.createBlog = (req, res, next) => {
  const { title, body } = req.body;

  const errors = validationResult(req, res, next);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ message: "Request error", data: null });
  }

  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      title: title,
      image: "image.png",
      body: body,
      created_at: "12/04/2021",
      author: {
        uid: 1,
        name: "Testing",
      },
    },
  };
  res.status(201).json(result);
};
