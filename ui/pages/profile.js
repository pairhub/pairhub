import Layout from "../components/Layout";
import ProfilePage from "../components/ProfilePage";
import withData from "../lib/withData";

const Profile = props => {
  return (
    <Layout>
      <ProfilePage username={props.url.query.username} />
    </Layout>
  );
};

export default withData(Profile);
