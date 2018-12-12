import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Grid } from "../components/styled";
import Posts from "../components/Posts";
import RepositoryInfo from "../components/RepositoryInfo";
const GITHUB_SEARCH_QUERY = gql`
  query GitHub_search($query: String!) {
    GitHub_search(first: 1, type: REPOSITORY, query: $query) {
      nodes {
        ... on GitHub_Repository {
          nameWithOwner
          description
          url
          owner {
            avatarUrl
          }
          issues(states: [OPEN]) {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

export default ({ router, currentUser }) => {
  const {
    query: { name }
  } = router;
  return (
    <Grid>
      <Posts currentUser={currentUser} repository={name} />
      <Query query={GITHUB_SEARCH_QUERY} variables={{ query: name }}>
        {({ loading, error, data: { GitHub_search } }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!GitHub_search.nodes[0]) return "no repo found";
          return <RepositoryInfo repository={GitHub_search.nodes[0]} />;
        }}
      </Query>
    </Grid>
  );
};
