import Layout from "../components/Layout";
import withData from "../lib/withData";
import Posts from "../components/Posts";

const Index = () => (
  <Layout>
    <Posts />
  </Layout>
);

export default withData(Index);
