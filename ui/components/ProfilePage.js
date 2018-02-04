import { gql, graphql } from 'react-apollo';
import { Row, Col, Card, CardText, CardBlock, CardTitle } from 'reactstrap';

const ProfilePage = ({ loading, user }) => {
  if (loading) {
    return (
      <p>Loading...</p>
    );
  } else if (user) {
    return (
        <Row>
          <Col sm="3">
            <img src={user.avatar_url} className="img-fluid" style={{borderRadius:'5px', marginBottom: '10px'}}/>
            <h3>{user.username}</h3>
            <h4>{user.name}</h4>
            <p><a href={user.github_url}>GitHub profile</a></p>
          </Col>
          <Col sm="9">
            <Card><CardBlock><CardText>Not much to see here yet!</CardText></CardBlock></Card>
          </Col>
        </Row>
    );
  }
  return (
    <p>404..</p>
  );
}

const USER_QUERY = gql`
  query userByUsername($username: String!) {
    user(username: $username) {
      id
      username
      name
      github_url
      avatar_url
    }
  }
`;

export default graphql(USER_QUERY, {
  options: (ownProps) => ({
      variables: { username: ownProps.username },
      fetchPolicy: 'cache-first',
  }),
  props: ({ data: { loading, user } }) => ({
    loading, user,
  }),
})(ProfilePage);
