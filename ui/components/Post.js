import styled from "styled-components";
import moment from "moment";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Tippy from "@tippy.js/react";
import Link from "next/link";
import { Flipped } from "react-flip-toolkit";

import { Card, Container, Avatar } from "./styled";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

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
  margin-bottom: 0;
  line-height: 1.5;
`;

const DateArea = styled.div`
  color: #a2a2a2;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
`;

const Actions = styled.div`
  margin-top: 10px;
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

const Tags = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

const GreyButtonBox = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 10px;
  font-weight: 500;
  font-size: 14px;
  color: ${props => (props.active ? "#404040" : "#7f7f7f")};
  border-radius: 6px;
  background-color: rgba(90, 100, 109, 0.05);
  cursor: pointer;

  transition: background-color 50ms ease-in-out;
  transition: color 50ms ease-in-out;
  span {
    margin-left: 8px;
    text-decoration: none !important;
  }
  &:hover {
    background-color: rgba(90, 100, 109, 0.07);
    color: #404040;
  }
`;

const Post = ({ post, currentUser }) => {
  if (!post) return null;
  return (
    <Flipped flipId={post._id}>
      <Container key={post._id}>
        <Avatar src={post.author.avatar_url} username={post.author.username} />
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
              content={moment(Number(post.created_at)).format(
                "YYYY-MM-DD HH:mm"
              )}
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

          {post.calendar_link && (
            <>
              <a href={post.calendar_link} target="_blank">
                Calendar link
              </a>
            </>
          )}

          {post.repository && (
            <Tags>
              <Link
                as={`/${post.repository}`}
                href={`/repository?repository=${post.repository}`}
              >
                <a style={{ textDecoration: "none" }}>
                  <GreyButtonBox>
                    <Icon icon={faGithub} /> <span>{post.repository}</span>
                  </GreyButtonBox>
                </a>
              </Link>
            </Tags>
          )}

          {currentUser && (
            <Actions>
              <a
                href={`https://gitter.im/${post.author.username}`}
                target="_blank"
              >
                <Button>DM</Button>
              </a>
              {currentUser._id === post.author._id && (
                <Mutation
                  mutation={DELETE_POST}
                  refetchQueries={["posts"]}
                  // update={(cache, { data: { deletePost } }) => {
                  //   const { posts } = cache.readQuery({
                  //     query: POSTS_QUERY
                  //     //variables: variables
                  //   });
                  //   cache.writeQuery({
                  //     query: POSTS_QUERY,
                  //     //variables: variables,
                  //     data: {
                  //       posts: posts.filter(post => post._id !== deletePost._id)
                  //     }
                  //   });
                  // }}
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
            </Actions>
          )}
        </Card>
      </Container>
    </Flipped>
  );
};

export default Post;
