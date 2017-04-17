import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Route, Switch } from 'react-router-dom';
import history from "../history.js";

import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { Container, Button, Navbar, Nav, NavbarBrand, NavLink, NavItem, Row, Col } from 'reactstrap';

import Navigation from '../components/Navigation';
import Landing from '../pages/Landing';
import About from '../pages/About';
import Profile from '../pages/Profile';
import ProjectsList from '../pages/ProjectsList';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Navigation authenticated={this.props.authenticated} />
          <Container style={{marginTop: '50px'}}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/about" component={About} />
              <Route path="/projects" component={ProjectsList} />
              <Route path="/:username" component={Profile} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default createContainer(() => {
  let loggingIn = Meteor.loggingIn();
  return {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId()
  }
}, App);
