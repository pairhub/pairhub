import { withRouter } from "next/router";

import SinglePost from "../components/SinglePost";
import Layout from "../components/Layout";
import withData from "../lib/withData";

const Post = props => {
  return (
    <Layout>
      <SinglePost id={props.router.query.id} />
    </Layout>
  );
};

export default withRouter(withData(Post));
