import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";
import Head from "./Head";

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border: 1px solid red;
  display: inline-block;
`;

const MenuLink = styled.a`
  margin-right: 15px;
`;

const Header = ({ loading, currentUser }) => {
  let loginOrProfile;

  if (loading) {
    loginOrProfile = <p>Loading</p>;
  } else if (currentUser) {
    loginOrProfile = (
      <span>
        <Avatar src={currentUser.avatar_url} />
        <a href="/logout">Log out</a>
      </span>
    );
  } else {
    loginOrProfile = <a href="/login/github">Login</a>;
  }

  return (
    <div>
      <Head />
      <Link href="/">
        <MenuLink>Home</MenuLink>
      </Link>
      <Link href="/about">
        <MenuLink>About</MenuLink>
      </Link>
      {loginOrProfile}
    </div>
  );
};

const CURRENT_USER_QUERY = gql`
  {
    currentUser {
      username
      avatar_url
    }
  }
`;

export default graphql(CURRENT_USER_QUERY, {
  options: {
    fetchPolicy: "cache-first"
  },
  props: ({ data: { loading, currentUser } }) => ({
    loading,
    currentUser
  })
})(Header);
