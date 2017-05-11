import Layout from '../components/Layout'
import ProfilePage from '../components/ProfilePage'

const Profile = (props) => {
  return (
    <Layout>
      <ProfilePage username={props.url.query.user} />
    </Layout>
  );
}

export default Profile;
