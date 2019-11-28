import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
  },
  name: String,
  avatar_url: String,
  github_url: String,
  email: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  seenWelcomeModal: Boolean,
});

const PostSchema = new mongoose.Schema({
  content: String,
  userId: { type: String, index: true },
  repository: String,
  calendarLink: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
}).index({ content: 'text', repository: 'text' });

export const Post = mongoose.model('Post', PostSchema);
Post.syncIndexes();

export const Comment = mongoose.model('Comment', {
  content: String,
  userId: String,
  postId: { type: mongoose.Schema.Types.ObjectId, index: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
