import { graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import moment from "moment";

const Post = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
`;

const Card = styled.div`
  background: white;
  padding: 15px 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.17);
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AuthorName = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #303030;
  margin: 0;
  margin-bottom: 15px;
`;

const Username = styled.span`
  font-weight: 300;
  color: #a2a2a2;
`;

const Content = styled.p`
  font-weight: 300;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Date = styled.div`
  color: #a2a2a2;
  font-size: 14px;
  font-weight: 300;
`;

const formatDate = date => {
  console.log(date);
  const formatted = moment(date).format("MMM D");
  console.log(formatted);
  return formatted;
};

const Posts = ({ loading, allPosts }) => {
  if (loading) {
    return <p>Loading...</p>;
  } else if (allPosts) {
    const cards = allPosts.map(post => (
      <Post key={post._id}>
        <Avatar src={post.author.avatar_url} />
        <Card>
          <Header>
            <AuthorName>
              {post.author.name} <Username>@{post.author.username}</Username>
            </AuthorName>
            <Date>{formatDate(post.created_at)}</Date>
          </Header>
          <Content>{post.content}</Content>
        </Card>
      </Post>
    ));
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
