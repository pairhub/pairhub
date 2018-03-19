import { graphql } from "react-apollo";
import gql from "graphql-tag";

const ProfilePage = ({ loading, user }) => {
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
};

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

export default graphql(USER_QUERY, {
  options: ownProps => ({
    variables: { username: ownProps.username },
    fetchPolicy: "cache-first"
  }),
  props: ({ data: { loading, user } }) => ({
    loading,
    user
  })
})(ProfilePage);
