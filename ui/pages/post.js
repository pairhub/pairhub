import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Post from "../components/Post";
import { Grid } from "../components/styled";
import { Card } from "../components/styled";

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
const POST_QUERY = gql`
  query post($id: String!) {
    post(id: $id) {
      _id
      content
      created_at
      author {
        _id
        name
        username
        avatar_url
      }
    }
  }
`;

export default props => (
  <Grid>
    <Query query={POST_QUERY} variables={{ id: props.router.query.id }}>
      {({ loading, error, data: { post } }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return <Post post={post} currentUser={props.currentUser} />;
      }}
    </Query>
    <Card>
      <CardTitle>👋 Welcome to PairHub!</CardTitle>
      <Text>
        PairHub is the friendly open source community to help you find remote
        pair programming partners.
      </Text>
    </Card>
  </Grid>
);
