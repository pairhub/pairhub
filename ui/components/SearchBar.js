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
  transition: box-shadow 100ms ease-in-out;

  ::placeholder {
    color: #878787;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.2);
  }

  @media (min-width: 795px) {
    margin-right: 5px;
  }
`;

const SearchBar = ({ searchPhrase: initialSearchPhrase = "" }) => {
  const [searchPhrase, setSearchPhrase] = React.useState(initialSearchPhrase);

  React.useEffect(() => {
    setSearchPhrase(searchPhrase);
  }, [initialSearchPhrase]);

  const handleEnter = () => {
    if (searchPhrase === "") {
      Router.push("/");
    } else {
      Router.push(`/?s=${searchPhrase}`);
    }
  };

  const onKeyPress = e => {
    if (e.key === "Enter") handleEnter();
  };

  return (
    <Input
      type="text"
      placeholder="Search posts"
      value={searchPhrase}
      onChange={e => setSearchPhrase(e.target.value)}
      onKeyPress={onKeyPress}
    />
  );
};

export default SearchBar;
