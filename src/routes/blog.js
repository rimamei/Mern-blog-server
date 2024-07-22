import express from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from '../controllers/blog.js';
import { validateBlog } from '../validation/blogValidation.js';
import { protect } from '../helper/protect.js';

// Define Router
const router = express.Router();

// Blog Routes
router.post('', protect, validateBlog, createBlog);
router.get('', protect, getAllBlog);
router.get('/:postId', protect, getBlogById);
router.put('/:postId', protect, validateBlog, updateBlog);
router.delete('/:postId', protect, deleteBlog);

export default router;
