import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  ingredients: { type: String, required: true }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;