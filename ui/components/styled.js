import styled from "styled-components";
import Link from "next/link";

export const Card = styled.div`
  background: white;
  padding: 15px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.17);
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 795px) {
    grid-template-columns: 5fr 2fr;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  margin-bottom: 25px;
  place-self: start stretch;
`;

export const AvatarImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  cursor: pointer;
`;

export const Avatar = ({ src, username }) => (
  <Link as={`/@${username}`} href={`/profile?username=${username}`}>
    <AvatarImg src={src} />
  </Link>
);

export const GreyBox = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  font-weight: 500;
  font-size: 16px;
  color: ${props => (props.hasFocus ? "#404040" : "#7f7f7f")};
  border-radius: 8px;
  background-color: ${props =>
    props.hasFocus ? "rgba(90, 100, 109, 0.05)" : "transparent"};
  cursor: pointer;
  span {
    margin-left: 15px;
  }
  &:hover {
    background-color: rgba(90, 100, 109, 0.05);
    color: #404040;
  }
`;

export const Input = styled.input`
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
