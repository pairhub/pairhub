import { withRouter } from "next/router";

import Layout from "../components/Layout";
import ProfilePage from "../components/ProfilePage";
import withData from "../lib/withData";

const Profile = props => {
  return (
    <Layout>
      <ProfilePage username={props.router.query.username} />
    </Layout>
  );
};

export default withRouter(withData(Profile));
