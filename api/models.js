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

export const Post = mongoose.model('Post', {
  content: { type: String, text: true },
  userId: { type: String, index: true },
  repository: { type: String, index: true },
  tags: [{
    type: mongoose.Schema.Types.ObjectId, index: true,
  }],
  calendarLink: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

export const Comment = mongoose.model('Comment', {
  content: String,
  userId: String,
  postId: { type: mongoose.Schema.Types.ObjectId, index: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Tag = mongoose.model('Tag', {
  content: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});
