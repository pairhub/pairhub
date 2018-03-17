import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import typeDefs from './schema';
import resolvers from './resolvers';
import setupGitHubLogin from './auth';
import { User, Post, Comment } from './models';

dotenv.config();
mongoose.connect('mongodb://localhost/db');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const PORT = 3010;

setupGitHubLogin(app);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
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
