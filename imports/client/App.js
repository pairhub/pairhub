import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import { Container, Button, Navbar, Nav, NavbarBrand, NavLink, NavItem, Row, Col } from 'reactstrap';

import Landing from './Landing';
import About from './About';
import Profile from './Profile';

class App extends Component {
  loginWithGithub() {
    Meteor.loginWithGithub({}, (error) => {
      if (error) {
        console.log(error);
      } else {
        // redirect to profile?
        console.log('Logged in successfully!');
      }
    });
  }
  render() {
    return (
      <Router>
          <div>
          <Navbar color="faded" light toggleable style={{padding: '0px'}}>
            <Container>

            <NavbarBrand tag={Link} to="/" style={{padding: '0px'}}>
              <img src="/pairhub-logo.png" width="50" height="50" />
            </NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="https://gitter.im/pairhub/Lobby" target="_blank">Chat</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/profile">Profile</NavLink>
              </NavItem>

            </Nav>
            <Nav navbar className="ml-auto">

              <NavItem>
                <Button onClick={this.loginWithGithub}><i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub</Button>
              </NavItem>
            </Nav>



            </Container>
          </Navbar>
          <Container style={{marginTop: '50px'}}>
            <Route exact={true} path="/" component={Landing} />} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default createContainer(() => {
  let usersSub = Meteor.subscribe('userData');
  return {
    ready: usersSub.ready(),
    users: Meteor.users.find().fetch()
    // items: Items.find({}).fetch()
    // needs to be imported, the collection that is.
  }
}, App);
