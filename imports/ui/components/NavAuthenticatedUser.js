import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { NavItem, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import history from '../../client/history.js';

class NavAuthenticatedUser extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleLogout() {
    Meteor.logout(() => { history.push('/'); });
  }

  render() {
    return (
      <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav caret>
          <img src={Meteor.user().profile.avatar_url} height="25" width="25" style={{'borderRadius':'3px'}} />
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem header>Signed in as <strong>@{Meteor.user().services.github.username}</strong></DropdownItem> */}
          <DropdownItem>Your profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.handleLogout}>Sign out</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

export default NavAuthenticatedUser;
