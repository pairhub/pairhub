import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";

import { POSTS_QUERY } from "../components/Posts";

const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
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

const Input = styled.textarea`
  border: 0;
  resize: none;
  width: 100%;
  min-height: 400px;
  font-size: 18px;
  border-radius: 8px;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;

class NewPost extends Component {
  state = {
    value: ""
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_POST}
        update={(cache, { data: { createPost } }) => {
          const { allPosts } = cache.readQuery({ query: POSTS_QUERY });
          cache.writeQuery({
            query: POSTS_QUERY,
            data: { allPosts: allPosts.concat([createPost]) }
          });
        }}
      >
        {createPost => (
          <form
            onSubmit={e => {
              e.preventDefault();
              createPost({
                variables: { content: this.state.value }
              }).then(({ data: { createPost } }) => {
                Router.push(
                  `/post?id=${createPost._id}`,
                  `/post/${createPost._id}`
                );
                this.props.closeModal();
              });
            }}
          >
            <Input
              value={this.state.value}
              onChange={this.onChange}
              autoFocus={true}
              placeholder="Write post.."
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default NewPost;
