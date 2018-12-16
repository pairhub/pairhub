import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";

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
    query: { repository: repositoryName }
  } = router;

  const [owner, name] = repositoryName.split("/");
  return (
    <Grid>
      <Posts currentUser={currentUser} repository={repositoryName} />
      <Query query={REPOSITORY_QUERY} variables={{ owner, name }}>
        {({ loading, error, data: { repository } }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!repository) return "no repo found";
          return (
            <>
              <Head>
                <title>PairHub - {repositoryName}</title>
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@pairhub" />
                <meta
                  property="twitter:title"
                  content={`${repository.full_name} | PairHub`}
                />
                <meta
                  property="twitter:description"
                  content={`Find remote pair programming partners for ${
                    repository.full_name
                  }`}
                />
                <meta
                  property="twitter:image"
                  content={repository.avatar_url}
                />
              </Head>
              <RepositoryInfo repository={repository} />
            </>
          );
        }}
      </Query>
    </Grid>
  );
};
