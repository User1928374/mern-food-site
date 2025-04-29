import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const { title, ingredients } = req.body;
  const post = await Post.create({
    user: req.user._id,
    title,
    ingredients,
  });
  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username');
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'username');
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }

  await post.deleteOne();
  res.json({ message: 'Post removed' });
};