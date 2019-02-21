import moment from 'moment';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Tippy from '@tippy.js/react';
import Link from 'next/link';
import { Flipped } from 'react-flip-toolkit';

import {
  Actions,
  AuthorName,
  Content,
  DateArea,
  GreyButtonBox,
  Header,
  SimpleButton,
  Tags,
  Username,
} from '../styles/Post';
import { Avatar, Card, Container } from '../styles/Shared';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

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
              content={moment(Number(post.created_at)).format('YYYY-MM-DD HH:mm')}
              duration={100}
              arrow
            >
              <Link as={`/post/${post._id}`} href={`/post?id=${post._id}`}>
                <DateArea>{moment(Number(post.created_at)).format('MMM D')}</DateArea>
              </Link>
            </Tippy>
          </Header>
          <Content>{post.content}</Content>

          {post.repository && (
            <Tags>
              <Link as={`/${post.repository}`} href={`/repository?repository=${post.repository}`}>
                <a style={{ textDecoration: 'none' }}>
                  <GreyButtonBox>
                    <Icon icon={faGithub} /> <span>{post.repository}</span>
                  </GreyButtonBox>
                </a>
              </Link>
            </Tags>
          )}

          {currentUser && (
            <Actions>
              <a href={`https://gitter.im/${post.author.username}`} target="_blank">
                <SimpleButton>DM</SimpleButton>
              </a>
              {currentUser._id === post.author._id && (
                <Mutation
                  mutation={DELETE_POST}
                  refetchQueries={['posts']}
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
                    <SimpleButton
                      onClick={() =>
                        confirm('Are you sure you want to delete this post?') &&
                        deletePost({ variables: { id: post._id } })
                      }
                    >
                      Delete
                    </SimpleButton>
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
