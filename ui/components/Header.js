import Link from "next/link";
import styled from "styled-components";
import Head from "./Head";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 20px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

const FlexEnd = styled.div``;

const MenuLink = styled.a`
  padding: 10px 15px;
  color: #7f7f7f;
  font-weight: 500;
  font-size: 18px;
  transition: color 50ms ease-in-out;
  text-decoration: none;

  &:hover {
    color: #404040;
  }
`;

const Header = ({ currentUser, searchPhrase }) => {
  return (
    <>
      <Head />
      <Container>
        <Link href="/">
          <Logo src="/static/pairhub-logo.png" />
        </Link>
        <SearchBar searchPhrase={searchPhrase} />
        <Link href="/about">
          <MenuLink>About</MenuLink>
        </Link>
        <MenuLink href="https://gitter.im/pairhub/Lobby" target="_blank">
          Chat
        </MenuLink>
        <MenuLink href="https://github.com/pairhub/pairhub" target="_blank">
          Source
        </MenuLink>
        <FlexEnd>
          {currentUser ? (
            <ProfileDropdown currentUser={currentUser} />
          ) : (
            <a href="/login/github">Login</a>
          )}
        </FlexEnd>
      </Container>
    </>
  );
};

export default Header;
