import { gql, graphql } from 'react-apollo';
import { Row, Col, Card, CardText, CardBlock, CardTitle } from 'reactstrap';
import Link from 'next/link';

const RecentSignups = ({ loading, users }) => {
  if (loading) {
    return (
      <p>Loading...</p>
    );
  } else if (users) {
    return (
      <Row>
        {users.map((user) =>
          <Col key={user.username} sm="2">
            <Link as={`/@${user.username}`} href={`/profile?user=${user.username}`}>
            <a><img src={user.avatar_url} className="img-fluid" style={{borderRadius:'5px'}} />
            @{user.username}</a>
          </Link>
          </Col>
        )}
      </Row>
    );
  }
  return (
    <p>404..</p>
  );
}

const QUERY = gql`
  query latestUsers($limit: Int!){
    users(limit: $limit) {
      username
      avatar_url
    }
  }
`;

export default graphql(QUERY, {
  options: {
      variables: { limit: 6 },
      fetchPolicy: 'cache-first',
  },
  props: ({ data: { loading, users } }) => ({
    loading, users,
  }),
})(RecentSignups);
