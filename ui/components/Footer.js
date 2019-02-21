import { MenuGrid, SmallIcon } from '../styles/Footer';
import { MenuLink } from '../styles/Shared';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <MenuGrid>
        <MenuLink href="https://gitter.im/pairhub/Lobby" target="_blank">
          Chat <SmallIcon icon={faExternalLinkAlt} />
        </MenuLink>
        <MenuLink href="https://github.com/pairhub/pairhub" target="_blank">
          Source <SmallIcon icon={faExternalLinkAlt} />
        </MenuLink>
      </MenuGrid>
    </>
  );
};

export default Footer;
