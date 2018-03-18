export default `
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
  title: String!
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
  post(id: String!): Post
  allPosts: [Post]
  comment(id: String!): Comment
}

type Mutation {
  createPost(title: String!, content: String!): Post
  createComment(postId: String!, content: String!): Comment
}
`;
