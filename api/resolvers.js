export default {
  Post: {
    comments: async (parent, args, { Comment }) => {
      const comments = await Comment.find({ postId: parent._id });
      return comments;
    },
  },
  Comment: {
    post: async (parent, args, { Post }) => {
      const post = await Post.findOne({ _id: parent.postId });
      return post;
    },
  },
  Query: {
    post: async (_, args, { Post }) => {
      const post = await Post.findOne({ _id: args.id });
      post._id = post._id.toString();
      return post;
    },
    allPosts: async (_, args, { Post }) => {
      const posts = await Post.find();
      return posts.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
    comment: async (_, args, { Comment }) => {
      const comment = await Comment.findOne({ _id: args.id });
      return comment;
    },
  },
  Mutation: {
    createPost: async (_, args, { Post }) => {
      const post = await new Post(args).save();
      post._id = post._id.toString();
      return post;
    },
    createComment: async (_, args, { Comment }) => {
      const comment = await new Comment(args).save();
      comment._id = comment._id.toString();
      return comment;
    },
  },
};
