import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";

export const POSTS_QUERY = gql`
  query allPosts {
    allPosts {
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

const Posts = ({ currentUser }) => (
  <Query query={POSTS_QUERY}>
    {({ loading, error, data: { allPosts } }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <div>
          {allPosts.map(post => (
            <Post key={post._id} post={post} currentUser={currentUser} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default Posts;
