import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import TextArea from "react-textarea-autosize";
import { _find } from "lodash";
import { Container, Avatar } from "./styled";
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
  cursor: pointer;
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

const EditPost = ({ post, currentUser, cancelEdit }) => {
  const [content, setContent] = React.useState(post.content);
  const [repository, setRepository] = React.useState(post.repository);
  const [calendarLink, setCalendarLink] = React.useState(post.calendarLink);

  const isText = content.length > 0;
  return (
    <Container>
      <Avatar src={currentUser.avatar_url} username={currentUser.username} />

      <Mutation mutation={EDIT_POST}>
        {editPost => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              if (!calendarLink || urlRegex.test(calendarLink)) {
                editPost({
                  variables: {
                    postId: post._id,
                    content,
                    repository,
                    calendarLink
                  }
                }).then(() => {
                  cancelEdit();
                });
              } else {
                alert("Enter a valid calendar link url");
              }
            }}
          >
            <InputContainer isActive={true}>
              <Input
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={`What would you like to pair on?`}
              />
              <MetaContainer isActive={true}>
                <AddRepo
                  repository={repository}
                  setRepository={setRepository}
                  clearRepository={() => setRepository(null)}
                />
                <AddCalendarLink
                  calendarLink={calendarLink}
                  setCalendarLink={setCalendarLink}
                />
                <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
                <EditButton
                  type="submit"
                  focus={true}
                  canSubmit={isText}
                  disabled={!isText}
                >
                  Edit
                </EditButton>
              </MetaContainer>
            </InputContainer>
          </Form>
        )}
      </Mutation>
    </Container>
  );
};

export default EditPost;
