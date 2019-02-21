import Link from 'next/link';
import Head from './Head';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';

import { HeaderContainer, Logo } from '../styles/Header';
import { MenuLink } from '../styles/Shared';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = ({ currentUser, searchPhrase }) => {
  return (
    <>
      <Head />
      <HeaderContainer>
        <div>
          <Link href="/">
            <Logo src="/static/pairhub-logo-white-180.png" />
          </Link>
          <SearchBar searchPhrase={searchPhrase} />
        </div>
        <div>
          <Link href="/about">
            <MenuLink>About</MenuLink>
          </Link>
          {currentUser ? (
            <>
              <div className="profile-dropdown">
                <ProfileDropdown currentUser={currentUser} />
              </div>
              <div className="mobile-container">
                <Link href={`/profile?username=${currentUser.username}`}>
                  <MenuLink>Profile</MenuLink>
                </Link>
                <MenuLink href="/logout">
                  Log out
                </MenuLink>
              </div>
            </>
          ) : (
            <MenuLink blue href="/login/github">
              <Icon icon={faGithub} /> Login with GitHub
            </MenuLink>
          )}
        </div>
      </HeaderContainer>
    </>
  );
};

export default Header;
