import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";

export const POSTS_QUERY = gql`
  query posts($searchPhrase: String) {
    posts(searchPhrase: $searchPhrase) {
      _id
      content
      created_at
      author {
        _id
        name
        username
        avatar_url
      }
    }
  }
`;

const Posts = ({ currentUser, searchPhrase }) => (
  <Query query={POSTS_QUERY} variables={{ searchPhrase }}>
    {({ loading, error, data: { posts } }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <div>
          {posts.map(post => (
            <Post key={post._id} post={post} currentUser={currentUser} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default Posts;
