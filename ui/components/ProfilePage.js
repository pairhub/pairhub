import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Tippy from '@tippy.js/react';
import Posts from './Posts';

import { ProfileArea } from '../styles/ProfilePage';
import { Grid } from '../styles/Shared';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
                <Posts userId={user.userId} currentUser={currentUser} />
                <ProfileArea>
                  <img src={user.avatar_url} />
                  <h1>{user.name}</h1>
                  <h2>@{user.username}</h2>
                  <div>
                    <Tippy content="GitHub profile" placement="bottom" duration={100} distance={5}>
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
