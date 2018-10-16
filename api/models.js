import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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

export const Post = mongoose.model('Post', {
  content: { type: String, text: true },
  authorId: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model('Comment', {
  content: String,
  authorId: String,
  postId: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
});
