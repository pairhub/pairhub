import ProfilePage from "../components/ProfilePage";

export default props => (
  <ProfilePage
    username={props.router.query.username}
    currentUser={props.currentUser}
  />
);
