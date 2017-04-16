import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavItem, Button } from 'reactstrap';

const handleLogin = () => {
  Meteor.loginWithGithub({}, (error) => {
    if (error) {
      console.log(error);
    } else {
      // redirect to profile?
      console.log('Logged in successfully!');
    }
  });
}

const NavLoginButton = () => (
  <NavItem>
    <Button onClick={handleLogin}><i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub</Button>
  </NavItem>
);

export default NavLoginButton;
