import React, { Component } from 'react';
import { Container, Button, Navbar, Nav, NavbarBrand, NavLink, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import NavLoginButton from './NavLoginButton';
import NavAuthenticatedUser from './NavAuthenticatedUser';

class Navigation extends Component {
  render() {

    // antingen !Meteor.user() ===> render log in button
    // eller Meteor.user() == true ==> render profile button and dropdown with logout button.
    return (
      <Navbar color="faded" light toggleable style={{padding: '0px'}}>
        <Container>
          <NavbarBrand tag={Link} to="/" style={{padding: '0px'}}>
            <img src="/pairhub-logo.png" width="50" height="50" />
          </NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/projects">Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">About</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            {this.props.authenticated ? <NavAuthenticatedUser /> : <NavLoginButton />}

          </Nav>
        </Container>
      </Navbar>
    )
  }

}
export default Navigation;
