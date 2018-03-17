export default {
  User: {
    email: (parent, args, { currentUser }) => (currentUser ? parent.email : null),
  },
  Post: {
    comments: async (parent, args, { Comment }) => {
      const comments = await Comment.find({ postId: parent._id });
      return comments;
    },
    author: async (parent, args, { User }) => {
      const user = await User.findOne({ userId: parent.authorId });
      return user;
    },
  },
  Comment: {
    post: async (parent, args, { Post }) => {
      const post = await Post.findOne({ _id: parent.postId });
      return post;
    },
    author: async (parent, args, { User }) => {
      const user = await User.findOne({ userId: parent.authorId });
      return user;
    },
  },
  Query: {
    user: async (_, { id }, { User }) => {
      const user = await User.findOne({ userId: id });
      return user;
    },
    allUsers: async (_, args, { User }) => {
      const users = await User.find();
      return users;
    },
    post: async (_, { id }, { Post }) => {
      const post = await Post.findOne({ _id: id });
      return post;
    },
    allPosts: async (_, args, { Post }) => {
      const posts = await Post.find();
      return posts;
    },
    comment: async (_, { id }, { Comment }) => {
      const comment = await Comment.findOne({ _id: id });
      return comment;
    },
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
