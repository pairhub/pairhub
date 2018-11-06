import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Head from "./Head";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";

const Logo = styled.img`
  height: 45px;
  width: 45px;
  margin-right: 20px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

const MenuLink = styled.a`
  padding: 12px 15px;
  color: ${props => (props.blue ? "#0000ff" : "#7f7f7f")};
  font-weight: 500;
  font-size: 18px;
  transition: color 50ms ease-in-out;
  text-decoration: none;
  display: block;
  border-radius: 4px;
  svg {
    font-size: 12px;
    margin-left: 4px;
  }
  &:hover {
    background-color: rgba(90, 100, 109, 0.05);
    color: ${props => (props.blue ? "#0000af" : "#404040")};
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
          Chat <Icon icon={faExternalLinkAlt} />
        </MenuLink>
        <MenuLink href="https://github.com/pairhub/pairhub" target="_blank">
          Source <Icon icon={faExternalLinkAlt} />
        </MenuLink>
        {currentUser ? (
          <ProfileDropdown currentUser={currentUser} />
        ) : (
          <MenuLink blue href="/login/github">
            <Icon icon={faGithub} /> Login with GitHub
          </MenuLink>
        )}
      </Container>
    </>
  );
};

export default Header;
