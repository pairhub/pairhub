import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextArea from "react-textarea-autosize";
import { Container, Avatar } from "./styled";
import { POSTS_QUERY } from "./Posts";
import AddRepo from "./AddRepo";
import AddCalendarLink from "./AddCalendarLink";

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

  @media (min-width: 620px) {
    margin-left: auto;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 8px;
  margin-top: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 8px;
  z-index: 1;
  position: relative;

  @media (min-width: 620px) {
    flex-direction: row;
  }
`;

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const NewPost = ({
  repository: initialRepository,
  focus,
  onFocus,
  onBlur,
  currentUser
}) => {
  const [value, setValue] = React.useState("");
  const [repository, setRepository] = React.useState(initialRepository);
  const [calendarLink, setCalendarLink] = React.useState("");

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const handleClick = e => {
      if (focus) {
        if (inputRef.current && !inputRef.current.contains(e.target)) onBlur();
      }
    };
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, [focus]);

  const clearRepository = e => {
    e.stopPropagation();
    setRepository(null);
  };

  const isText = value.length > 0;
  const isActive = isText || focus; /* || this.state.addRepo; */

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
              if (!calendarLink.length || urlRegex.test(calendarLink)) {
                createPost({
                  variables: {
                    content: value,
                    repository: repository,
                    calendarLink: calendarLink
                  }
                }).then(() => {
                  setValue("");
                  setRepository(null);
                  setCalendarLink("");
                  onBlur();
                });
              } else {
                alert("Enter a valid calendar link url");
              }
            }}
          >
            <InputContainer isActive={isActive} innerRef={inputRef}>
              <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={onFocus}
                placeholder={`What would you like to pair on?`}
              />
              {isActive && (
                <MetaContainer>
                  <AddRepo
                    repository={repository}
                    setRepository={setRepository}
                    clearRepository={clearRepository}
                  />
                  <AddCalendarLink
                    calendarLink={calendarLink}
                    setCalendarLink={setCalendarLink}
                  />
                  <SubmitButton
                    type="submit"
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
};

export default NewPost;
