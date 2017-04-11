import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

class App extends Component {
  render() {
    return (
      <h1>Welcome to PairHub!</h1>
    );
  }
}
