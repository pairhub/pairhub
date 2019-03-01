import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import typeDefs from './schema';
import resolvers from './resolvers';
import setupGitHubLogin from './auth';
import { User, Post, Comment, Tag } from './models';

dotenv.config();
mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/db');

const app = express();

setupGitHubLogin(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    currentUser: req.user,
    User,
    Post,
    Comment,
    Tag,
  }),
});

server.applyMiddleware({ app });

app.listen({ port: 3010 }, () =>
  console.log(`🚀 Server ready at http://localhost:3010${server.graphqlPath}`));
