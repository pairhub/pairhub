import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link, Route } from 'react-router-dom';
import history from "./history.js";


import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import { Container, Button, Navbar, Nav, NavbarBrand, NavLink, NavItem, Row, Col } from 'reactstrap';

import Landing from './Landing';
import About from './About';
import Profile from './Profile';
import Navigation from '../ui/components/Navigation';
import Projects from '../ui/components/Projects';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Navigation authenticated={this.props.authenticated} />
          <Container style={{marginTop: '50px'}}>
            <Route exact path="/" component={Landing} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default createContainer(() => {
  let userSub = Meteor.subscribe('userData');
  let loggingIn = Meteor.loggingIn();
  return {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
    ready: userSub.ready()
  }
}, App);
