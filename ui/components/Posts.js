import { graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const Post = styled.div`
  background: white;
  padding: 10px;
  margin: 10px 0;
`;

const Posts = ({ loading, allPosts }) => {
  if (loading) {
    return <p>Loading...</p>;
  } else if (allPosts) {
    const cards = allPosts.map(post => (
      <Post key={post._id}>
        {post.content}
        <br />
        {post.created_at}
      </Post>
    ));
    return cards;
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
