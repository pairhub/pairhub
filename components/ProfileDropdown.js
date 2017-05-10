import React, { Component } from 'react';
import { NavItem, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileDropdown extends Component {
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

  render() {
    return (
      <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav caret>
          <img src={this.props.currentUser.avatar_url} height="25" width="25" style={{'borderRadius':'3px'}} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Signed in as <strong>@{this.props.currentUser.login}</strong></DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/logout">Sign out</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

export default ProfileDropdown;
