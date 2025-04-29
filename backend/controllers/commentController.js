import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  const { text, rating } = req.body;
  const postId = req.params.postId;

  const comment = await Comment.create({
    user: req.user._id,
    post: postId,
    text,
    rating,
  });

  res.status(201).json(comment);
};

export const getCommentsForPost = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ post: postId })
    .populate('user', 'username')
    .sort({ createdAt: -1 });

  res.json(comments);
};