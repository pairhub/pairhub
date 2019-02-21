import React, { Component } from 'react';
import Link from 'next/link';
import { ProfileDropdownContainer } from '../styles/ProfileDropdown';
import { Dropdown, Item, List, ProfileAvatar, MenuLink } from '../styles/Shared';

class ProfileDropdown extends Component {
  state = { dropdownExpanded: false };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    if (this.state.dropdownExpanded) {
      if (!this.node.contains(e.target)) this.toggleDropdown();
    }
  };

  toggleDropdown = () => {
    this.setState({ dropdownExpanded: !this.state.dropdownExpanded });
  };

  render() {
    return (
      <ProfileDropdownContainer innerRef={c => (this.node = c)}>
        <ProfileAvatar onClick={this.toggleDropdown} src={this.props.currentUser.avatar_url} />
        {this.state.dropdownExpanded && (
          <Dropdown>
            <List>
              <Item>
                <Link
                  prefetch
                  as={`/@${this.props.currentUser.username}`}
                  href={`/profile?username=${this.props.currentUser.username}`}
                >
                  <a>Profile</a>
                </Link>
              </Item>
              <Item>
                <a href="/logout">Log out</a>
              </Item>
            </List>
          </Dropdown>
        )}
      </ProfileDropdownContainer>
    );
  }
}

export default ProfileDropdown;
