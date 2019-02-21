import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { POSTS_QUERY } from './Posts';
import AddRepo from './AddRepo';

import { MetaContainer } from '../styles/NewPost';
import {
  Avatar,
  Form,
  InputContainer,
  Container,
  TextareaInput,
  SubmitButton,
} from '../styles/Shared';

const CREATE_POST = gql`
  mutation createPost($content: String!, $repository: String) {
    createPost(content: $content, repository: $repository) {
      _id
      content
      created_at
      repository
      author {
        _id
        name
        username
        avatar_url
      }
    }
  }
`;

class NewPost extends Component {
  state = {
    value: '',
    repository: this.props.repository,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    if (this.props.focus) {
      if (!this.node.contains(e.target)) this.props.onBlur();
    }
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  setRepository = name => {
    this.setState({ repository: name });
  };

  clearRepository = e => {
    e.stopPropagation();
    this.setState({ repository: null });
  };

  render() {
    const { currentUser } = this.props;

    const isText = this.state.value.length > 0;
    const isActive = isText || this.props.focus || this.state.addRepo;

    return (
      <Container>
        <Avatar src={currentUser.avatar_url} username={currentUser.username} />

        <Mutation
          mutation={CREATE_POST}
          update={(cache, { data: { createPost } }) => {
            const { posts } = cache.readQuery({ query: POSTS_QUERY });
            cache.writeQuery({
              query: POSTS_QUERY,
              data: { posts: [createPost].concat(posts) },
            });
          }}
        >
          {createPost => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                createPost({
                  variables: {
                    content: this.state.value,
                    repository: this.state.repository,
                  },
                }).then(() => {
                  this.setState({ value: '', repository: null });
                  this.props.onBlur();
                });
              }}
            >
              <InputContainer isActive={isActive} innerRef={c => (this.node = c)}>
                <TextareaInput
                  value={this.state.value}
                  onChange={this.onChange}
                  onFocus={this.props.onFocus}
                  placeholder={`What would you like to pair on?`}
                />
                {isActive && (
                  <MetaContainer isActive={isActive}>
                    <AddRepo
                      repository={this.state.repository}
                      setRepository={this.setRepository}
                      clearRepository={this.clearRepository}
                    />
                    <SubmitButton
                      type="submit"
                      focus={isActive}
                      canSubmit={isText}
                      disabled={!isText}
                    >
                      Post
                    </SubmitButton>
                  </MetaContainer>
                )}
              </InputContainer>
            </Form>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default NewPost;
