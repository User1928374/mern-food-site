import express from 'express';
import { createComment, getCommentsForPost } from '../controllers/commentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: /api/comments/:postId
router.route('/:postId')
  .get(getCommentsForPost)
  .post(protect, createComment);

export default router;