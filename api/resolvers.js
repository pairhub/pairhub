import fetch from 'node-fetch';

export default {
  User: {
    email: (parent, args, { currentUser }) => (currentUser ? parent.email : null),
    posts: async (parent, args, { Post }) =>
      Post.find({ userId: parent.userId }).sort({ created_at: -1 }),
  },
  Post: {
    comments: async (parent, args, { Comment }) => Comment.find({ postId: parent._id }),
    author: async (parent, args, { User }) => User.findOne({ userId: parent.userId }),
    created_at: parent => new Date(parent.created_at).getTime(),
  },
  Comment: {
    post: async (parent, args, { Post }) => Post.findOne({ _id: parent.postId }),
    author: async (parent, args, { User }) => User.findOne({ userId: parent.userId }),
  },
  Repository: {
    url: parent => parent.html_url,
    avatar_url: parent => parent.owner.avatar_url,
  },
  Query: {
    user: async (_, { username }, { User }) => User.findOne({ username }),
    allUsers: async (_, args, { User }) => User.find(),
    currentUser: (_, args, { currentUser }) => currentUser,
    post: async (_, { id }, { Post }) => Post.findOne({ _id: id }),
    posts: async (_, {
      offset, searchPhrase, userId, repository,
    }, { Post }) => {
      const limit = 20;

      if (userId) {
        return Post.find({ userId })
          .sort({ created_at: -1 })
          .skip(offset || 0)
          .limit(limit);
      } else if (searchPhrase) {
        return Post.find({ $text: { $search: searchPhrase } })
          .sort({ created_at: -1 })
          .skip(offset || 0)
          .limit(limit);
      } else if (repository) {
        return Post.find({ repository })
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
    repository: async (_, { owner, name }) => {
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
      const response = await fetch(`https://api.github.com/repos/${owner}/${name}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`);
      if (response.status === 404) return null;
      const data = await response.json();
      return data;
    },
    searchRepositories: async (_, { query }) => {
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`);
      if (response.status === 404) return null;
      const data = await response.json();
      return data.items;
    },
  },
  Mutation: {
    createPost: async (_, { content, repository, calendarLink }, { currentUser, Post }) => {
      if (!currentUser) throw new Error('Not logged in');
      return new Post({
        content,
        userId: currentUser.userId,
        repository,
        calendar_link: calendarLink,
      }).save();
    },
    deletePost: async (_, { id }, { Post, currentUser }) => {
      if (!currentUser) throw new Error('Not logged in');
      return Post.findOneAndRemove({ _id: id, userId: currentUser.userId });
    },
    createComment: async (_, { postId, content }, { Comment, currentUser }) => {
      if (!currentUser) throw new Error('Not logged in');

      return new Comment({
        postId,
        content,
        userId: currentUser.userId,
      }).save();
    },
  },
};
