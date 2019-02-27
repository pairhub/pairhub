import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextArea from "react-textarea-autosize";
import { _find } from "lodash";
import { Container, Avatar } from "./styled";
import { POSTS_QUERY } from "./Posts";
import AddRepo from "./AddRepo";
import AddCalendarLink from "./AddCalendarLink";

const EDIT_POST = gql`
  mutation editPost(
    $postId: String!
    $content: String
    $repository: String
    $calendarLink: String
  ) {
    editPost(
      postId: $postId
      content: $content
      repository: $repository
      calendarLink: $calendarLink
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

const EditButton = styled.button`
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

const CancelButton = styled.button`
  margin-left: auto;
  margin-right: 10px;
  display: block;
  color: black;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 15px;
  border-radius: 6px;
  border: 0;
  cursor: "pointer";
  background-color: transparent;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 8px;
  margin-top: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 8px;
  z-index: 1;
  position: relative;
`;

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
class EditPost extends Component {
  state = {
    content: this.props.post.content,
    repository: this.props.post.repository,
    calendarLink: this.props.post.calendarLink
  };

  onChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  setCalendarLink = value => this.setState({ calendarLink: value });

  setRepository = name => {
    this.setState({ repository: name });
  };

  clearRepository = e => {
    e.stopPropagation();
    this.setState({ repository: null });
  };

  render() {
    const {
      currentUser,
      cancelEdit,
      post: { _id: postId }
    } = this.props;

    const isText = this.state.content.length > 0;
    const isActive = true;
    return (
      <Container>
        <Avatar src={currentUser.avatar_url} username={currentUser.username} />

        <Mutation mutation={EDIT_POST}>
          {editPost => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                if (
                  !this.state.calendarLink ||
                  // this.state.calendarLink &&
                  urlRegex.test(this.state.calendarLink)
                ) {
                  editPost({
                    variables: {
                      postId,
                      content: this.state.content,
                      repository: this.state.repository,
                      calendarLink: this.state.calendarLink
                    }
                  }).then(() => {
                    cancelEdit();
                  });
                } else {
                  alert("Enter a valid calendar link url");
                }
              }}
            >
              <InputContainer
                isActive={isActive}
                innerRef={c => (this.node = c)}
              >
                <Input
                  value={this.state.content}
                  onChange={this.onChange}
                  placeholder={`What would you like to pair on?`}
                />
                {isActive && (
                  <MetaContainer isActive={isActive}>
                    <AddRepo
                      repository={this.state.repository}
                      setRepository={this.setRepository}
                      clearRepository={this.clearRepository}
                    />
                    <AddCalendarLink
                      calendarLink={this.state.calendarLink}
                      setCalendarLink={this.setCalendarLink}
                    />
                    <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
                    <EditButton
                      type="submit"
                      focus={isActive}
                      canSubmit={isText}
                      disabled={!isText}
                    >
                      Edit
                    </EditButton>
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

export default EditPost;
