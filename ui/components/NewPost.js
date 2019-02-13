import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextArea from "react-textarea-autosize";
import { Flipped } from "react-flip-toolkit";
import { Container, Avatar } from "./styled";
import { POSTS_QUERY } from "./Posts";
import AddRepo from "./AddRepo";

const CREATE_POST = gql`
  mutation createPost(
    $content: String!
    $repository: String
    $calendarLink: String
  ) {
    createPost(
      content: $content
      repository: $repository
      calendarLink: $calendarLink
    ) {
      _id
      content
      created_at
      repository
      calendar_link
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

const InputContainer = styled.div`
  border-radius: 8px;
  background-color: ${props => (props.isActive ? "white" : "transparent")};
  box-shadow: ${props =>
    props.isActive ? "0 2px 4px 0 rgba(126, 126, 126, 0.17)" : "0"};
  transition: background-color 1000ms ease-out;
  transition: box-shadow 100ms ease-out;
  display: flex;
  flex-direction: column;
`;

const Input = styled(TextArea)`
  border: 0;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  min-height: 24px;
  padding: 15px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const CalendarLinkInput = styled.input``;

const SubmitButton = styled.button`
  display: block;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 15px;
  border-radius: 6px;
  border: 0;
  cursor: ${props => (props.canSubmit ? "pointer" : "disabled")};
  background-color: ${props =>
    props.canSubmit ? "#0000ff" : "rgba(0,0,255,0.2)"};
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${props =>
      props.canSubmit ? "#0000af" : "rgba(0,0,255,0.2)"};
  }
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
  margin-top: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 8px;
  z-index: 1;
  position: relative;
`;

class NewPost extends Component {
  state = {
    value: "",
    repository: this.props.repository,
    calendarLink: null
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (this.props.focus) {
      if (!this.node.contains(e.target)) this.props.onBlur();
    }
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  onCalendarLinkChange = e => {
    this.setState({ calendarLink: e.target.value });
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
              data: { posts: [createPost].concat(posts) }
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
                    calendarLink: this.state.calendarLink
                  }
                }).then(() => {
                  this.setState({ value: "", repository: null });
                  this.props.onBlur();
                });
              }}
            >
              <InputContainer
                isActive={isActive}
                innerRef={c => (this.node = c)}
              >
                <Input
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
                    <CalendarLinkInput
                      placeholder="Add a calendly/canumeet link here"
                      onChange={this.onCalendarLinkChange}
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
