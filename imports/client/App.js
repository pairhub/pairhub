import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import { Container, Button, Navbar, Nav, NavbarBrand, NavLink, NavItem, Row, Col } from 'reactstrap';

import Landing from './Landing';
import About from './About';

class App extends Component {
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

            </Nav>
            <Nav navbar className="ml-auto">

              <NavItem>
                <Button><i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub</Button>
              </NavItem>
            </Nav>



            </Container>
          </Navbar>
          <Container style={{marginTop: '50px'}}>
            <Route exact={true} path="/" component={Landing} />
            <Route path="/about" component={About} />
          </Container>


        </div>
      </Router>

    );
  }
}

export default App;
