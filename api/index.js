import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';

import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://localhost/db');

const Post = mongoose.model('Post', { title: String, content: String });

const Comment = mongoose.model('Comment', { content: String, postId: String });

const PORT = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Post, Comment } }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
