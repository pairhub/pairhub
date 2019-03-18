import styled from "styled-components";
import moment from "moment";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Tippy from "@tippy.js/react";
import Link from "next/link";
import { Flipped } from "react-flip-toolkit";
import SocialButton from "./SocialButton";

import { Card, Container, Avatar } from "./styled";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarAlt,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import EditPost from "./EditPost";

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
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;

  @media (min-width: 620px) {
    flex-direction: row;
  }
`;

const GreyButtonBox = styled.div`
  display: flex;
  align-items: stretch;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;

  transition: background-color 50ms ease-in-out;
  transition: color 50ms ease-in-out;

  @media (min-width: 620px) {
    margin-right: 5px;
    margin-bottom: 0;
  }

  span {
    margin-left: 6px;
    text-decoration: none !important;
  }
  a {
    padding: 7px 8px;
    display: block;
    background-color: rgba(90, 100, 109, 0.05);
    color: ${props => (props.active ? "#404040" : "#7f7f7f")};

    &:hover {
      background-color: rgba(90, 100, 109, 0.1);
      color: #404040;
    }
    &:nth-child(2) {
      padding-left: 5px;
    }
    text-decoration: none !important;
  }
`;

const ExternalLinkIcon = styled(Icon)`
  font-size: 11px;
  margin-left: 2px;
  opacity: 0.6;
`;

const Post = ({ post, currentUser }) => {
  if (!post) return null;

  const [editing, setEditing] = React.useState(false);

  if (editing)
    return (
      <EditPost
        currentUser={currentUser}
        post={post}
        cancelEdit={() => setEditing(false)}
      />
    );
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

          <Tags>
            {post.repository && (
              <>
                <GreyButtonBox>
                  <Link
                    as={`/${post.repository}`}
                    href={`/repository?repository=${post.repository}`}
                  >
                    <a style={{ textDecoration: "none" }}>
                      <Icon icon={faGithub} /> <span>{post.repository}</span>{" "}
                    </a>
                  </Link>
                  <a
                    href={`https://github.com/${post.repository}`}
                    target="_blank"
                  >
                    <ExternalLinkIcon icon={faExternalLinkAlt} />
                  </a>
                </GreyButtonBox>
              </>
            )}

            {post.calendarLink && (
              <GreyButtonBox>
                <a
                  href={post.calendarLink}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Icon icon={faCalendarAlt} /> <span>Calendar</span>{" "}
                  <ExternalLinkIcon icon={faExternalLinkAlt} />
                </a>
              </GreyButtonBox>
            )}
          </Tags>

          {currentUser && (
            <Actions>
              {currentUser._id !== post.author._id && (
                <a
                  href={`https://gitter.im/${post.author.username}`}
                  target="_blank"
                >
                  <Button>DM</Button>
                </a>
              )}
              {currentUser._id === post.author._id && (
                <>
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
                          confirm(
                            "Are you sure you want to delete this post?"
                          ) && deletePost({ variables: { id: post._id } })
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </Mutation>
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                </>
              )}
              <SocialButton post={post} />
            </Actions>
          )}
        </Card>
      </Container>
    </Flipped>
  );
};

export default Post;
