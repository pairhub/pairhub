import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID!
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
    repository: String
    comments: [Comment]
    created_at: String!
    calendar_link: String
  }

  type Comment {
    _id: String!
    content: String!
    author: User!
    post: Post!
    created_at: String!
  }

  type Repository {
    id: Int!
    full_name: String
    open_issues_count: Int
    stargazers_count: Int
    description: String
    avatar_url: String
    url: String
  }

  type Query {
    user(username: String!): User
    allUsers: [User]
    currentUser: User
    post(id: String!): Post
    posts(offset: Int, searchPhrase: String, userId: String, repository: String): [Post]
    repository(owner: String!, name: String!): Repository
    searchRepositories(query: String!): [Repository]
    comment(id: String!): Comment
  }

  type Mutation {
    createPost(content: String!, repository: String, calendarLink: String): Post
    deletePost(id: String!): Post
    createComment(postId: String!, content: String!): Comment
  }
`;
