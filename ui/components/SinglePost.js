import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";

const POST_QUERY = gql`
  query post($id: String!) {
    post(id: $id) {
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

const SinglePost = ({ id, currentUser }) => (
  <Query query={POST_QUERY} variables={{ id }}>
    {({ loading, error, data: { post } }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return <Post post={post} currentUser={currentUser} />;
    }}
  </Query>
);

export default SinglePost;
