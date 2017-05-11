import React, { Component } from 'react';
import { NavItem, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';

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
          <DropdownItem header>Signed in as <strong>@{this.props.currentUser.username}</strong></DropdownItem>
          <DropdownItem onClick={() => Router.push(`/profile?user=${this.props.currentUser.username}`, `/@${this.props.currentUser.username}`)}>Your profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/logout">Sign out</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

export default ProfileDropdown;

// <Link as={`/@${this.props.currentUser.username}`} href={`/profile?user=${this.props.currentUser.username}`}><a>Your profile</a></Link>
