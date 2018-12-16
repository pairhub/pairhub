import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Grid } from "../components/styled";
import Posts from "../components/Posts";
import RepositoryInfo from "../components/RepositoryInfo";

const REPOSITORY_QUERY = gql`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      full_name
      description
      avatar_url
      url
      open_issues_count
      stargazers_count
    }
  }
`;

export default ({ router, currentUser }) => {
  const {
    query: { repository }
  } = router;

  const [owner, name] = repository.split("/");
  return (
    <Grid>
      <Posts currentUser={currentUser} repository={repository} />
      <Query query={REPOSITORY_QUERY} variables={{ owner, name }}>
        {({ loading, error, data: { repository } }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!repository) return "no repo found";
          return <RepositoryInfo repository={repository} />;
        }}
      </Query>
    </Grid>
  );
};
