import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import typeDefs from './schema';
import resolvers from './resolvers';
import setupGitHubLogin from './auth';

dotenv.config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://localhost/db');

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
});

export const Post = mongoose.model('Post', {
  title: String,
  content: String,
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

const PORT = 3000;

const app = express();

setupGitHubLogin(app);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req =>
    // Query too large check here?
    ({
      schema,
      context: {
        currentUser: req.user,
        User,
        Post,
        Comment,
      },
    })),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
