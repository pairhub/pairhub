import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Post from "./Post";
import NewPost from "./NewPost";
import { Flipper } from "react-flip-toolkit";

export const POSTS_QUERY = gql`
  query posts($offset: Int, $searchPhrase: String, $authorId: String) {
    posts(offset: $offset, searchPhrase: $searchPhrase, authorId: $authorId)
      @connection(key: "posts", filter: ["searchPhrase", "authorId"]) {
      _id
      content
      created_at
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

class Posts extends Component {
  state = { hasMore: true, focus: false };

  componentWillReceiveProps() {
    this.setState({ hasMore: true });
  }

  onFocus = () => this.setState({ focus: true });
  onBlur = () => this.setState({ focus: false });

  render() {
    const { currentUser, searchPhrase, authorId } = this.props;
    const showNewPostForm =
      currentUser && !(authorId && authorId !== currentUser.userId);

    return (
      <Query
        query={POSTS_QUERY}
        variables={{ offset: 0, searchPhrase, authorId }}
      >
        {({ loading, error, data: { posts }, fetchMore }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (posts.length === 0) return "No posts found";

          const onLoadMore = () =>
            fetchMore({
              variables: { offset: posts.length },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (fetchMoreResult.posts.length < 20) {
                  this.setState({ hasMore: false });
                }
                return {
                  posts: [...prev.posts, ...fetchMoreResult.posts]
                };
              }
            });
          return (
            <div>
              <Flipper flipKey={this.state.focus}>
                {showNewPostForm && (
                  <NewPost
                    currentUser={currentUser}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    focus={this.state.focus}
                  />
                )}
                {posts.map(post => (
                  <Post key={post._id} post={post} currentUser={currentUser} />
                ))}

                <Center>
                  {posts.length >= 20 && this.state.hasMore && (
                    <button onClick={onLoadMore}>Load more</button>
                  )}
                </Center>
              </Flipper>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Posts;
