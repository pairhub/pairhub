import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";

const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      content
      author {
        username
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

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.value);
  };

  render() {
    return (
      <Mutation mutation={CREATE_POST}>
        {createPost => (
          <form
            onSubmit={e => {
              e.preventDefault();
              createPost({ variables: { content: this.state.value } });
              Router.push("/");
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
