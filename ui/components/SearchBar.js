import React, { Component } from 'react';
import Router from 'next/router';

import { Input } from '../styles/Shared';

class SearchBar extends Component {
  state = {
    value: this.props.searchPhrase || '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.searchPhrase || '' });
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onKeyPress = e => {
    if (e.key === 'Enter') this.handleEnter();
  };

  handleEnter = () => {
    if (this.state.value !== this.props.searchPhrase) {
      if (this.state.value === '') {
        Router.push('/');
      } else {
        Router.push(`/?s=${this.state.value}`);
      }
    }
  };

  render() {
    return (
      <Input
        type="text"
        placeholder="Search posts"
        value={this.state.value}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

export default SearchBar;
