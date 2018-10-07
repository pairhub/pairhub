import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: String!
    userId: String!
    username: String!
    name: String
    avatar_url: String
    github_url: String
    email: String
    created_at: String!
    posts: [Post]
  }

  type Post {
    _id: String!
    content: String!
    author: User!
    comments: [Comment]
    created_at: String!
  }

  type Comment {
    _id: String!
    content: String!
    author: User!
    post: Post!
    created_at: String!
  }

  type Query {
    user(username: String!): User
    allUsers: [User]
    currentUser: User
    post(id: String!): Post
    posts: [Post]
    comment(id: String!): Comment
  }

  type Mutation {
    createPost(content: String!): Post
    deletePost(id: String!): Post
    createComment(postId: String!, content: String!): Comment
  }
`;
