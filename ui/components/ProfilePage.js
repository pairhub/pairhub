import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Tippy from "@tippy.js/react";

import Posts from "./Posts";
import { Grid } from "./styled";

const USER_QUERY = gql`
  query userByUsername($username: String!) {
    user(username: $username) {
      userId
      username
      name
      github_url
      avatar_url
    }
  }
`;

const ProfileArea = styled.div`
  img {
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
  }
  h1 {
    font-weight: 600;
    font-size: 26px;
    margin: 0;
    color: #24292e;
  }
  h2 {
    font-weight: 300;
    font-size: 20px;
    color: #666666;
    margin: 0;
  }
  div {
    margin: 5px 0;
  }
  a {
    color: #666666;
    font-size: 20px;
    &:hover {
      color: #24292e;
    }
  }
`;

const ProfilePage = ({ username, currentUser }) => {
  if (username) {
    return (
      <Query query={USER_QUERY} variables={{ username }}>
        {({ loading, data: { user } }) => {
          if (loading) {
            return <p>Loading...</p>;
          } else if (user) {
            return (
              <Grid>
                <Posts authorId={user.userId} currentUser={currentUser} />
                <ProfileArea>
                  <img src={user.avatar_url} />
                  <h1>{user.name}</h1>
                  <h2>@{user.username}</h2>
                  <div>
                    <Tippy
                      content="GitHub profile"
                      placement="bottom"
                      duration={100}
                      distance={5}
                    >
                      <a href={user.github_url}>
                        <Icon icon={faGithub} />
                      </a>
                    </Tippy>
                  </div>

                  <div />
                </ProfileArea>
              </Grid>
            );
          }
          return <p>404..</p>;
        }}
      </Query>
    );
  }
};

export default ProfilePage;
