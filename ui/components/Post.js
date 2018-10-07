import styled from "styled-components";
import moment from "moment";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { Card } from "./styled";

import { POSTS_QUERY } from "../components/Posts";

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

const Actions = styled.div`
  margin-top: 5px;
`;

const Button = styled.button`
  cursor: pointer;
`;

const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id) {
      _id
    }
  }
`;

const Post = ({ post, currentUser }) => {
  if (!post) return null;
  return (
    <Container key={post._id}>
      <Avatar src={post.author.avatar_url} />
      <Card>
        <Header>
          <AuthorName>
            {post.author.name} <Username>@{post.author.username}</Username>
          </AuthorName>
          <Date>{moment(Number(post.created_at)).format("MMM D")}</Date>
        </Header>
        <Content>{post.content}</Content>
        <Actions>
          <Mutation
            mutation={DELETE_POST}
            update={(cache, { data: { deletePost } }) => {
              const { posts } = cache.readQuery({ query: POSTS_QUERY });
              cache.writeQuery({
                query: POSTS_QUERY,
                data: {
                  posts: posts.filter(post => post._id !== deletePost._id)
                }
              });
            }}
          >
            {deletePost =>
              currentUser &&
              post.author._id === currentUser._id && (
                <Button
                  onClick={() =>
                    confirm("Are you sure you want to delete this post?") &&
                    deletePost({ variables: { id: post._id } })
                  }
                >
                  Delete
                </Button>
              )
            }
          </Mutation>
        </Actions>
      </Card>
    </Container>
  );
};

export default Post;
