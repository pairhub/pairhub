import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextArea from "react-textarea-autosize";
import { Flipped } from "react-flip-toolkit";

import { Container, Avatar } from "./styled";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled(TextArea)`
  border: 0;
  resize: none;
  border-radius: 8px;
  font-size: 18px;
  border-radius: 8px;
  padding: 15px;
  background-color: ${props => (props.value ? "white" : "#f5f6f7")};
  box-shadow: ${props =>
    props.value ? "0 2px 4px 0 rgba(126, 126, 126, 0.17)" : "0"};
  transition: background-color 300ms ease-out;
  transition: box-shadow 100ms ease-out;
  &:focus {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.17);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  display: block;
  color: white;
  font-size: 14px;
  padding: 18px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
  border: 0;
  cursor: ${props => (props.canSubmit ? "pointer" : "disabled")};
  background-color: ${props => (props.canSubmit ? "#0000ff" : "lightGrey")};
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: ${props => (props.canSubmit ? "#0000af" : "lightGrey")};
  }
`;

const SubmitArea = styled.div`
  height: ${props => (props.focus ? "64px" : "0px")};
  overflow: hidden;
`;

class NewPost extends Component {
  state = {
    value: "",
    showButton: false
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const isText = this.state.value.length > 0;
    const isActive = isText || this.props.focus;

    return (
      <Container>
        <Avatar
          src={this.props.currentUser.avatar_url}
          username={this.props.currentUser.username}
        />

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
                  this.setState({ value: "" });
                  this.props.onBlur();
                });
              }}
            >
              <Input
                value={this.state.value}
                onChange={this.onChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                placeholder="I'd like to pair on ..."
              />
              <Flipped flipId="button">
                <SubmitArea focus={isActive}>
                  {isActive && (
                    <SubmitButton
                      type="submit"
                      focus={isActive}
                      canSubmit={isText}
                      disabled={!isText}
                    >
                      Post
                    </SubmitButton>
                  )}
                </SubmitArea>
              </Flipped>
            </Form>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default NewPost;
