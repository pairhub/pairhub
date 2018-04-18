import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";
import Head from "./Head";

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 15px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

const FlexEnd = styled.div`
  margin-left: auto;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  display: inline-block;
  cursor: pointer;
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
        <a href="/logout">Log out</a>
        <Link
          as={`/@${currentUser.username}`}
          href={`/profile?username=${currentUser.username}`}
        >
          <Avatar src={currentUser.avatar_url} />
        </Link>
      </span>
    );
  } else {
    loginOrProfile = <a href="/login/github">Login</a>;
  }

  return (
    <Container>
      <Head />
      <Link href="/">
        <Logo src="/static/pairhub-logo.png" />
      </Link>
      <Link href="/">
        <MenuLink>Home</MenuLink>
      </Link>
      <Link href="/about">
        <MenuLink>About</MenuLink>
      </Link>
      <FlexEnd>{loginOrProfile}</FlexEnd>
    </Container>
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
