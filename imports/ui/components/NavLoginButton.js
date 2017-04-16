import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavItem, Button } from 'reactstrap';
import history from '../../client/history.js';


const handleLogin = () => {
  Meteor.loginWithGithub({}, (error) => {
    if (error) {
      console.log(error);
    } else {
      history.push('/projects');
    }
  });
}

const NavLoginButton = () => (
  <NavItem>
    <Button onClick={handleLogin}><i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub</Button>
  </NavItem>
);

export default NavLoginButton;
