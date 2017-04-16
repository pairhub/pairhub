import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
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
          <Navigation />
          <Container style={{marginTop: '50px'}}>
            <Route exact={true} path="/" component={Landing} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
          </Container>
          <Button onClick={() => history.push('/about')}>Test button</Button>
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
