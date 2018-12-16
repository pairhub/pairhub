import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";

const Input = styled.input`
  flex: 1 1 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(126, 126, 126, 0.075);
  height: 45px;
  padding: 0 15px;
  font-size: 18px;
  font-weight: 300;
  border: 0;
  margin-right: 5px;
  transition: box-shadow 100ms ease-in-out;

  ::placeholder {
    color: #878787;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.2);
  }
`;

class SearchBar extends Component {
  state = {
    value: this.props.searchPhrase || ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.searchPhrase || "" });
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onKeyPress = e => {
    if (e.key === "Enter") this.handleEnter();
  };

  handleEnter = () => {
    if (this.state.value !== this.props.searchPhrase) {
      if (this.state.value === "") {
        Router.push("/");
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
