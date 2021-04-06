const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const BlogPost = require("../models/blog");

exports.createBlog = (req, res, next) => {
  const errors = validationResult(req, res, next);
  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.status = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const { title, body } = req.body;
  console.log("Request file", req.file);
  const image = req.file.path;
  console.log(image);

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: "Rima" },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Blog Post Success",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAllBlog = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data Blog Berhasil Di read",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogById = (req, res, next) => {
  BlogPost.findById(req.params.postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Data params berhasil dipanggil", data: result });
    })
    .catch((err) => next(err));
};

exports.updateBlog = (req, res, next) => {
  const errors = validationResult(req, res, next);
  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.status = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const { title, body } = req.body;
  const image = req.file.path;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("");
        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Update Sukses", data: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blog Post Tidak Ditemukan");
        error.errorStatus = 404;
        throw error;
      }

      removeImage(post.image);
      BlogPost.findByIdAndRemove(postId).then((result) =>
        res.status(200).json({
          message: "Hapus blog berhasil",
          data: result,
        })
      );
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filepath) => {
  console.log("filepath: ", filepath);
  console.log("dir name: ", __dirname);

  filepath = path.join(__dirname, "../..", filepath);
  console.log(filepath);
  fs.unlink(filepath, (err) => console.log(err));
};
