import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Post from "./Post";
import NewPost from "./NewPost";
import { Flipper } from "react-flip-toolkit";

export const POSTS_QUERY = gql`
  query posts(
    $offset: Int
    $searchPhrase: String
    $userId: String
    $repository: String
  ) {
    posts(
      offset: $offset
      searchPhrase: $searchPhrase
      userId: $userId
      repository: $repository
    )
      @connection(
        key: "posts"
        filter: ["searchPhrase", "userId", "repository"]
      ) {
      _id
      content
      created_at
      repository
      calendarLink
      author {
        _id
        name
        username
        avatar_url
      }
    }
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Posts = ({ currentUser, searchPhrase, userId, repository }) => {
  const [hasMore, setHasMore] = React.useState(true);
  const [focus, setFocus] = React.useState(false);

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);

  React.useEffect(() => {
    setHasMore(true);
  }, [currentUser, searchPhrase, userId, repository]);

  const showNewPostForm =
    currentUser && !(userId && userId !== currentUser.userId);

  return (
    <Query
      query={POSTS_QUERY}
      variables={{ offset: 0, searchPhrase, userId, repository }}
    >
      {({ loading, error, data: { posts }, fetchMore }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        // if (posts.length === 0) return "No posts found";

        const onLoadMore = () =>
          fetchMore({
            variables: { offset: posts.length },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              if (fetchMoreResult.posts.length < 20) {
                setHasMore(false);
              }
              return {
                posts: [...prev.posts, ...fetchMoreResult.posts]
              };
            }
          });
        return (
          <div>
            <Flipper flipKey={focus}>
              {showNewPostForm && (
                <NewPost
                  currentUser={currentUser}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  focus={focus}
                  repository={repository}
                />
              )}
              {posts.map(post => (
                <Post key={post._id} post={post} currentUser={currentUser} />
              ))}

              <Center>
                {posts.length >= 20 && hasMore && (
                  <button onClick={onLoadMore}>Load more</button>
                )}
              </Center>
            </Flipper>
          </div>
        );
      }}
    </Query>
  );
};

export default Posts;
