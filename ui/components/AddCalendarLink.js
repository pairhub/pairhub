import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippy.js/react";

import { GreyBox, Input } from "./styled";

export default ({ calendarLink, setCalendarLink }) => {
  const [hasFocus, setFocus] = React.useState(false);

  return (
    <GreyBox hasFocus={hasFocus || calendarLink}>
      <Icon icon={faCalendarAlt} />
      <Tippy
        content="Add a Calendly.com (or similar) <br />link for easy time slot booking"
        placement="bottom"
        arrow
      >
        <Input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={calendarLink}
          onChange={e => setCalendarLink(e.target.value)}
          placeholder="Add calendar link"
          size="15"
        />
      </Tippy>
    </GreyBox>
  );
};
