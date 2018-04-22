import Layout from "../components/Layout";
import withData from "../lib/withData";

const About = () => (
  <Layout>
    <p>This is the about page</p>
  </Layout>
);

export default withData(About);
