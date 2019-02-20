import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippy.js/react";

import { GreyBox } from "./styled";

const Input = styled.input`
  background: transparent;
  padding: 12px 8px;
  color: #404040;
  font-weight: 500;
  border-radius: 8px;
  border: 0;
  margin: 0;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const CalendarIcon = styled(Icon)`
  //margin-right: 10px;
`;

export default ({ calendarLink, setCalendarLink, clearCalendarLink }) => {
  const [hasFocus, setFocus] = React.useState(false);
  return (
    // <GreyBox
    //   active={active || calendarLink.length}
    //   onClick={() => {
    //     setActive(true);
    //   }}
    // >
    //   <CalendarIcon icon={faCalendarAlt} />
    //   {active ? (
    //     <Input
    //       autoFocus
    //       onBlur={() => setActive(false)}
    //       value={calendarLink}
    //       onChange={e => setCalendarLink(e.target.value)}
    //       placeholder="Enter calendar link..."
    //     />
    //   ) : (
    //     <span>{calendarLink.length ? calendarLink : "Add calendar link"}</span>
    //   )}
    // </GreyBox>
    <GreyBox hasFocus={hasFocus || calendarLink}>
      <CalendarIcon icon={faCalendarAlt} />
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={calendarLink}
        onChange={e => setCalendarLink(e.target.value)}
        placeholder="Add calendar link"
      />
    </GreyBox>
  );
};
