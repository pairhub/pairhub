import styled from "styled-components";
import moment from "moment";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Tippy from "@tippy.js/react";
import Link from "next/link";

import { Card } from "./styled";

import { POSTS_QUERY } from "../components/Posts";

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  margin-bottom: 25px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 25px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AuthorName = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: #303030;
  margin: 0;
`;

const Username = styled.span`
  font-weight: 300;
  color: #a2a2a2;
`;

const Content = styled.p`
  font-weight: 300;
  margin-top: 5px;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const DateArea = styled.div`
  color: #a2a2a2;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
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
          <Link
            as={`/@${post.author.username}`}
            href={`/profile?username=${post.author.username}`}
          >
            <AuthorName>
              {post.author.name} <Username>@{post.author.username}</Username>
            </AuthorName>
          </Link>

          <Tippy
            content={moment(Number(post.created_at)).format("YYYY-MM-DD HH:mm")}
            duration={100}
            arrow
          >
            <Link as={`/post/${post._id}`} href={`/post?id=${post._id}`}>
              <DateArea>
                {moment(Number(post.created_at)).format("MMM D")}
              </DateArea>
            </Link>
          </Tippy>
        </Header>
        <Content>{post.content}</Content>
        <Actions>
          {currentUser && (
            <>
              <a
                href={`https://gitter.im/${post.author.username}`}
                target="_blank"
              >
                <Button>DM</Button>
              </a>
              {currentUser._id === post.author._id && (
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
                  {deletePost => (
                    <Button
                      onClick={() =>
                        confirm("Are you sure you want to delete this post?") &&
                        deletePost({ variables: { id: post._id } })
                      }
                    >
                      Delete
                    </Button>
                  )}
                </Mutation>
              )}
            </>
          )}
        </Actions>
      </Card>
    </Container>
  );
};

export default Post;
