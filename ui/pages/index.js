import Layout from "../components/Layout";
import withData from "../lib/withData";

const Index = () => (
  <Layout>
    <p>Welcome to PairHub</p>
  </Layout>
);

export default withData(Index);
