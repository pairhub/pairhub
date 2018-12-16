import Head from "next/head";
import ProfilePage from "../components/ProfilePage";

export default props => (
  <>
    <Head>
      <title>PairHub - @{props.router.query.username}</title>
    </Head>
    <ProfilePage
      username={props.router.query.username}
      currentUser={props.currentUser}
    />
  </>
);
