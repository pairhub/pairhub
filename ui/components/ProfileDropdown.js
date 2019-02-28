import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import Tippy from "@tippy.js/react";

const Avatar = styled.img`
  border-radius: 25px;
  height: 45px;
  width: 45px;
  display: inline-block;
  cursor: pointer;
`;

const Dropdown = styled.div`
  width: 150px;
  right: 0px;
  position: absolute;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 1px 6px 0 rgba(100, 105, 110, 0.3);
`;

const List = styled.ul`
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  font-size: 14px;
  line-height: 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  a {
    color: #3d4045;
    display: block;
    padding: 6px 8px;
    text-decoration: none;
  }

  &:hover {
    background: #f4f5f6;
  }

  &:last-child {
    border-bottom: 0;
    a {
      color: #9aa1aa;
    }
  }
`;

const Container = styled.div`
  position: relative;
  margin-left: 10px;
`;

const ProfileDropdown = ({ currentUser }) => {
  const [dropdownExpanded, setDropdownExpanded] = React.useState(false);

  const inputRef = React.useRef(null);

  const toggleDropdown = () => {
    setDropdownExpanded(!dropdownExpanded);
  };

  const handleClick = e => {
    if (dropdownExpanded) {
      if (inputRef.current && !inputRef.current.contains(e.target))
        toggleDropdown();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  });

  return (
    <Container innerRef={inputRef}>
      <Avatar onClick={toggleDropdown} src={currentUser.avatar_url} />
      {dropdownExpanded && (
        <Dropdown>
          <List>
            <Item>
              <Link
                prefetch
                as={`/@${currentUser.username}`}
                href={`/profile?username=${currentUser.username}`}
              >
                <a>Profile</a>
              </Link>
            </Item>
            <Item>
              <a href="/logout">Log out</a>
            </Item>
          </List>
        </Dropdown>
      )}
    </Container>
  );
};

export default ProfileDropdown;
