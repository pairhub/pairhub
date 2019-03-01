import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import Post from "../components/Post";
import { Grid } from "../components/styled";
import Sidebar from "../components/Sidebar";

const POST_QUERY = gql`
  query post($id: String!) {
    post(id: $id) {
      _id
      content
      created_at
      repository
      calendarLink
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
        return (
          <>
            <Head>
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@pairhub" />
              <meta
                property="twitter:title"
                content={`@${
                  post.author.username
                } is looking for pair programming partners`}
              />
              <meta property="twitter:description" content={post.content} />
              <meta property="twitter:image" content={post.author.avatar_url} />
            </Head>
            <Post post={post} currentUser={props.currentUser} />
          </>
        );
      }}
    </Query>
    <Sidebar />
  </Grid>
);
