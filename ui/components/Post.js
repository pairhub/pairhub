import styled from "styled-components";
import moment from "moment";

import { Card } from "./styled";

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  margin-bottom: 25px;
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

const Post = ({ post }) => {
  return (
    <Container key={post._id}>
      <Avatar src={post.author.avatar_url} />
      <Card>
        <Header>
          <AuthorName>
            {post.author.name} <Username>@{post.author.username}</Username>
          </AuthorName>
          <Date>{moment(post.created_at).format("MMM D")}</Date>
        </Header>
        <Content>{post.content}</Content>
      </Card>
    </Container>
  );
};

export default Post;
