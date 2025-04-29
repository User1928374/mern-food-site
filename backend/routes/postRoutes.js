import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
} from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById)
  .delete(protect, deletePost);

export default router;