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
  grid-template-columns: 5fr 2fr;
  grid-gap: 20px;
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
