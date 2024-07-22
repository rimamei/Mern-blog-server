import { validationResult } from 'express-validator';
import BlogPost from '../models/blog.js';
import { removeImage } from '../helper/multer.js';
import { response } from '../utils/response.js';

export const createBlog = async (req, res, next) => {
  try {
    // Validate Request
    const errors = validationResult(req, res, next);

    // Check if there is an error on validation
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      err.status = 400;
      err.data = null;
      throw err;
    }

    // Check if there is no image uploaded
    if (!req.file) {
      const err = new Error('Image is required');
      err.errorStatus = 422;
      throw err;
    }

    // Get title and content from request body
    const { title, content } = req.body;

    // Get user from request
    const user = req.user;

    // Get image path from request file
    const image = req.file.path;

    // Create new BlogPost object
    const Posting = new BlogPost({
      title: title,
      content: content,
      image: image,
      author: user._id,
    });

    // Save BlogPost object to database
    const result = await Posting.save();

    return response(res, result, 201, 'Blog Post has added successfully');
  } catch (error) {
    next(error);
  }
};

export const getAllBlog = async (req, res, next) => {
  try {
    // Get all blog post from database
    const result = await BlogPost.find();

    // return response
    return response(res, result, 200, 'Viewed successfully');
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    // Get blog post by id from database
    const result = await BlogPost.findById(req.params.postId);

    // Check if blog post not found
    if (!result) {
      const error = new Error('Blog Post is not found');
      error.errorStatus = 404;
      throw error;
    }

    // return response
    return response(res, result, 200, 'Viewed successfully');
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    // Validate Request
    const errors = validationResult(req, res, next);

    // Check if there is an error on validation
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      err.status = 400;
      err.data = null;
      throw err;
    }

    // Check if there is no image uploaded
    if (!req.file) {
      const err = new Error('Image is required');
      err.errorStatus = 422;
      throw err;
    }

    // Get title and content from request body
    const { title, content } = req.body;

    // Get image path from request file
    const image = req.file.path;

    // Get post id from request params
    const postId = req.params.postId;

    // Find post by id
    const post = await BlogPost.findById(postId);

    // Check if post not found
    if (!post) {
      const err = new Error('Blog Post is not found');
      err.status = 400;
      err.data = null;
      throw err;
    }

    // Update post data
    post.title = title;
    post.content = content;
    post.image = image;

    // Save updated post data
    const updatedPost = await post.save();

    // return response
    return response(
      res,
      updatedPost,
      200,
      'Blog Post has updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    // Get post id from request params
    const postId = req.params.postId;

    // Find post by id
    const post = await BlogPost.findOne({ _id: postId });

    // Check if post not found
    if (!post) {
      const error = new Error('Blog Post is not found');
      error.errorStatus = 404;
      throw error;
    }

    // Remove image from server
    removeImage(post.image);

    // Delete post by id
    const result = await BlogPost.deleteOne({ _id: postId });

    // return response
    return response(res, 'OK', 200, 'Blog Post has deleted successfully');
  } catch (error) {
    next(error);
  }
};
