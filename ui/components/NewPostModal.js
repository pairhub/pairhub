import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { POSTS_QUERY } from "./Posts";

const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
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

const Card = styled.div`
  background: white;
  border-radius: 8px;
  min-height: 300px;
  min-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  border: 0;
  resize: none;
  min-height: 300px;
  font-size: 18px;
  border-radius: 8px;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: #0000ff;
  display: block;
  color: white;
  font-size: 14px;
  padding: 18px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 0;
  cursor: pointer;
  transition: background-color 50ms ease-in-out;
  margin: 10px;

  &:hover {
    background: #0000af;
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
      <Card>
        <Mutation
          mutation={CREATE_POST}
          update={(cache, { data: { createPost } }) => {
            const { posts } = cache.readQuery({ query: POSTS_QUERY });
            cache.writeQuery({
              query: POSTS_QUERY,
              data: { posts: [createPost].concat(posts) }
            });
          }}
        >
          {createPost => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                createPost({
                  variables: { content: this.state.value }
                }).then(({ data: { createPost } }) => {
                  // Router.push(
                  //   `/post?id=${createPost._id}`,
                  //   `/post/${createPost._id}`
                  // );
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
              <SubmitButton type="submit">Post</SubmitButton>
            </Form>
          )}
        </Mutation>
      </Card>
    );
  }
}

export default NewPost;
