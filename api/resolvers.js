export default {
  User: {
    email: (parent, args, { currentUser }) => (currentUser ? parent.email : null),
    posts: async (parent, args, { Post }) =>
      Post.find({ authorId: parent.userId }).sort({ created_at: -1 }),
  },
  Post: {
    comments: async (parent, args, { Comment }) => Comment.find({ postId: parent._id }),
    author: async (parent, args, { User }) => User.findOne({ userId: parent.authorId }),
    created_at: parent => new Date(parent.created_at).getTime(),
  },
  Comment: {
    post: async (parent, args, { Post }) => Post.findOne({ _id: parent.postId }),
    author: async (parent, args, { User }) => User.findOne({ userId: parent.authorId }),
  },
  Query: {
    user: async (_, { username }, { User }) => User.findOne({ username }),
    allUsers: async (_, args, { User }) => User.find(),
    currentUser: (_, args, { currentUser }) => currentUser,
    post: async (_, { id }, { Post }) => Post.findOne({ _id: id }),
    posts: async (_, { offset, searchPhrase, authorId }, { Post }) => {
      const limit = 20;

      if (authorId) {
        Post.find({ authorId })
          .sort({ created_at: -1 })
          .skip(offset || 0)
          .limit(limit);
      }
      if (searchPhrase) {
        return Post.find({ $text: { $search: searchPhrase } })
          .sort({ created_at: -1 })
          .skip(offset || 0)
          .limit(limit);
      }
      return Post.find()
        .sort({ created_at: -1 })
        .skip(offset || 0)
        .limit(limit);
    },
    comment: async (_, { id }, { Comment }) => Comment.findOne({ _id: id }),
  },
  Mutation: {
    createPost: async (_, { content }, { Post, currentUser }) => {
      if (!currentUser) throw new Error('Not logged in');

      return new Post({
        content,
        authorId: currentUser.userId,
      }).save();
    },
    deletePost: async (_, { id }, { Post, currentUser }) => {
      if (!currentUser) throw new Error('Not logged in');
      return Post.findOneAndRemove({ _id: id, authorId: currentUser.userId });
    },
    createComment: async (_, { postId, content }, { Comment, currentUser }) => {
      if (!currentUser) throw new Error('Not logged in');

      return new Comment({
        postId,
        content,
        authorId: currentUser.userId,
      }).save();
    },
  },
};
