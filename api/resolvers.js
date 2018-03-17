export default {
  User: {
    email: (parent, args, { currentUser }) => (currentUser ? parent.email : null),
  },
  Post: {
    comments: async (parent, args, { Comment }) => Comment.find({ postId: parent._id }),
    author: async (parent, args, { User }) => User.findOne({ userId: parent.authorId }),
  },
  Comment: {
    post: async (parent, args, { Post }) => Post.findOne({ _id: parent.postId }),
    author: async (parent, args, { User }) => User.findOne({ userId: parent.authorId }),
  },
  Query: {
    user: async (_, { id }, { User }) => User.findOne({ userId: id }),
    allUsers: async (_, args, { User }) => User.find(),
    post: async (_, { id }, { Post }) => Post.findOne({ _id: id }),
    allPosts: async (_, args, { Post }) => Post.find(),
    comment: async (_, { id }, { Comment }) => Comment.findOne({ _id: id }),
  },
  Mutation: {
    createPost: async (_, { title, content }, { Post, currentUser }) => {
      if (currentUser) {
        const post = await new Post({
          title,
          content,
          authorId: currentUser.userId,
        }).save();
        return post;
      }
      // TODO: is this correct?
      return null;
    },
    createComment: async (_, { postId, content }, { Comment, currentUser }) => {
      if (currentUser) {
        const comment = await new Comment({
          postId,
          content,
          authorId: currentUser.userId,
        }).save();
        return comment;
      }
      return null;
    },
  },
};
