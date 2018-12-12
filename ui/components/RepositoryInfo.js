import styled from "styled-components";
import Tippy from "@tippy.js/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { Card } from "./styled";

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
`;

const Text = styled.p`
  color: #62676d;
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 0;
`;

const Sidebar = styled.div``;
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
            <img src={repository.owner.avatarUrl} /> {repository.nameWithOwner}
          </Title>
        </a>
        <h2>{repository.description}</h2>
        <span>
          <a href={`${repository.url}/issues`}>
            {repository.issues.totalCount} open issues
          </a>{" "}
          •{" "}
          <a href={`${repository.url}/stargazers`}>
            {repository.stargazers.totalCount} stars
          </a>
        </span>
      </ProfileArea>
    </Card>
  </div>
);
