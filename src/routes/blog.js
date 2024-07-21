import express from 'express';
import { body } from 'express-validator';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from '../controllers/blog.js';

const router = express.Router();

// [POST] : /v1/blog/post
router.post(
  '/post',
  [
    body('title').isLength({ min: 5 }).withMessage('Title kurang dari 5 huruf'),
    body('body').isLength({ min: 5 }).withMessage('Body kurang dari 5 huruf'),
  ],
  createBlog
);

router.get('/post', getAllBlog);
router.get('/post/:postId', getBlogById);
router.put(
  '/post/:postId',
  [
    body('title').isLength({ min: 5 }).withMessage('Title kurang dari 5 huruf'),
    body('body').isLength({ min: 5 }).withMessage('Body kurang dari 5 huruf'),
  ],
  updateBlog
);
router.delete('/post/:postId', deleteBlog);

export default router;
