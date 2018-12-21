import styled from "styled-components";
import { Card } from "./styled";

const Title = styled.h1`
  img {
    height: 26px;
    border-radius: 4px;
    margin-right: 8px;
  }
  line-height: 26px;
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  padding: 0;
  margin-bottom: 10px;
  color: #24292e;
  display: flex;
`;
const ProfileArea = styled.div`
  h1 {
  }
  h2 {
    font-weight: 400;
    color: #62676d;
    font-size: 16px;
    line-height: 1.5;
  }
  div {
    margin: 5px 0;
  }
  a {
    color: #666666;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: #0000ff;
    }
  }
  span {
    color: #666666;
  }
`;

export default ({ repository }) => (
  <div>
    <Card>
      <ProfileArea>
        <a href={repository.url} target="_blank">
          <Title>
            <img src={repository.avatar_url} /> {repository.full_name}
          </Title>
        </a>
        <h2>{repository.description}</h2>
        <span>
          <a href={`${repository.url}/issues`}>
            {repository.open_issues_count} open issues
          </a>{" "}
          •{" "}
          <a href={`${repository.url}/stargazers`}>
            {repository.stargazers_count} stars
          </a>
        </span>
      </ProfileArea>
    </Card>
  </div>
);
