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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://localhost/db');

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
