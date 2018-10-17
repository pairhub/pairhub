import SinglePost from "../components/SinglePost";
import Layout from "../components/Layout";

const Post = props => {
  return (
    <Layout {...props}>
      <SinglePost id={props.router.query.id} currentUser={props.currentUser} />
    </Layout>
  );
};

export default Post;
