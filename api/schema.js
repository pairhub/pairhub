export default `
type Post {
  _id: String!
  title: String!
  content: String!
  comments: [Comment]
}

type Comment {
  _id: String!
  content: String!
  postId: String
  post: Post
}

type Query {
  post(id: String!): Post
  allPosts: [Post]
  comment(id: String!): Comment
}

type Mutation {
  createPost(title: String!, content: String!): Post
  createComment(postId: String!, content: String!): Comment
}
`;
