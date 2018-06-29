import { Query } from "react-apollo";
import gql from "graphql-tag";

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

const ProfilePage = ({ username }) => {
  if (username) {
    return (
      <Query query={USER_QUERY} variables={{ username }}>
        {({ loading, data: { user } }) => {
          if (loading) {
            return <p>Loading...</p>;
          } else if (user) {
            return (
              <div>
                <img
                  src={user.avatar_url}
                  style={{ borderRadius: "5px", marginBottom: "10px" }}
                />
                <h3>{user.username}</h3>
                <h4>{user.name}</h4>
                <p>
                  <a href={user.github_url}>GitHub profile</a>
                </p>
              </div>
            );
          }
          return <p>404..</p>;
        }}
      </Query>
    );
  }
};

export default ProfilePage;
