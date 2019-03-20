import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Head from "./Head";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";

const minWidth = '795px';

const Logo = styled.img`
  height: 45px;
  width: 45px;
  margin-right: 20px;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0;

  @media (min-width: ${minWidth}) {
    flex-direction: row;
  }
`;

const SearchBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  flex: 1;
  order: 2;

  @media (min-width: ${minWidth}) {
    order: 1;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  order: 1;

  @media (min-width: ${minWidth}) {
    margin-bottom: 0;
    order: 2;
  }
`;

const MenuLink = styled.a`
  padding: 12px;
  color: ${props => (props.blue ? "white" : "#7f7f7f")};
  background-color: ${props => (props.blue ? "#0000ff" : "transparent")};
  font-weight: 500;
  font-size: 16px;
  transition: color 50ms ease-in-out;
  text-decoration: none;
  display: block;
  border-radius: 6px;

  &:hover {
    background-color: ${props =>
      props.blue ? "#0000af" : "rgba(90, 100, 109, 0.05)"};
    color: ${props => (props.blue ? "white" : "#404040")};
  }
`;

const SmallIcon = styled(Icon)`
  font-size: 12px;
  margin-left: 4px;
`;

const Header = ({ currentUser, searchPhrase }) => {
  return (
    <>
      <Head />
      <HeaderContainer>
        <SearchBarContainer>
          <Link href="/">
            <Logo src="/static/pairhub-logo-white-180.png" />
          </Link>
          <SearchBar searchPhrase={searchPhrase} />
        </SearchBarContainer>
        <NavLinksContainer>
          <Link href="/about">
            <MenuLink>About</MenuLink>
          </Link>
          <MenuLink href="https://gitter.im/pairhub/Lobby" target="_blank">
            Chat <SmallIcon icon={faExternalLinkAlt} />
          </MenuLink>
          <MenuLink href="https://github.com/pairhub/pairhub" target="_blank">
            Source <SmallIcon icon={faExternalLinkAlt} />
          </MenuLink>
          {currentUser ? (
            <ProfileDropdown currentUser={currentUser} />
          ) : (
            <MenuLink blue href="/login/github">
              <Icon icon={faGithub} /> Login with GitHub
            </MenuLink>
          )}
        </NavLinksContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
