import { gql, graphql } from 'react-apollo';
import { Button } from 'reactstrap';
import Link from 'next/link';

import ProfileDropdown from './ProfileDropdown';

const Profile = ({ loading, currentUser }) => {
  if (loading) {
    return (
      <p>Loading...</p>
    );
  } else if (currentUser) {
    return (
      <ProfileDropdown currentUser={currentUser} />
    );
  }
  return (
    <a href="/login/github"><Button><i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub</Button></a>
  );
}

const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    currentUser {
      username
      avatar_url
    }
  }
`;

export default graphql(PROFILE_QUERY, {
  options: {
    fetchPolicy: 'cache-first',
  },
  props: ({ data: { loading, currentUser } }) => ({
    loading, currentUser,
  }),
})(Profile);