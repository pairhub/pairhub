import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";

const SinglePost = ({ loading, post }) => {
  if (loading) {
    return <p>Loading...</p>;
  } else if (post) {
    return <Post post={post} />;
  }
  return <p>404..</p>;
};

const POST_QUERY = gql`
  query post($id: String!) {
    post(id: $id) {
      content
      created_at
      author {
        name
        username
        avatar_url
      }
    }
  }
`;

export default graphql(POST_QUERY, {
  options: ownProps => ({
    variables: { id: ownProps.id },
    fetchPolicy: "cache-first"
  }),
  props: ({ data: { loading, post } }) => ({
    loading,
    post
  })
})(SinglePost);
