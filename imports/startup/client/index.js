import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../../ui/layouts/App';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styling/style.css';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
