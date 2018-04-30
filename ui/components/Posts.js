import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";

const Posts = ({ loading, allPosts }) => {
  if (loading) {
    return <p>Loading...</p>;
  } else if (allPosts) {
    const cards = allPosts.map(post => <Post key={post._id} post={post} />);
    return <div>{cards}</div>;
  }
  return <p>404..</p>;
};

const POSTS_QUERY = gql`
  query allPosts {
    allPosts {
      _id
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

export default graphql(POSTS_QUERY, {
  options: {
    fetchPolicy: "cache-first"
  },
  props: ({ data: { loading, allPosts } }) => ({
    loading,
    allPosts
  })
})(Posts);
