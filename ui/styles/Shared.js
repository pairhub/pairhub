import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';
import Link from 'next/link';

export const Avatar = ({ src, username }) => (
  <Link as={`/@${username}`} href={`/profile?username=${username}`}>
    <AvatarImg src={src} />
  </Link>
);

export const AvatarImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  cursor: pointer;
`;

export const Button = styled.button`
  background: #0000ff;
  display: block;
  color: white;
  font-size: 14px;
  padding: 18px 22px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  transition: background-color 50ms ease-in-out;

  &:hover {
    background: #0000af;
  }
`;

export const Card = styled.div`
  background: white;
  padding: 15px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.17);
`;

export const CardContainer = styled.div`
  max-width: 520px;
  background: white;
  border-radius: 8px;
  min-height: 300px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 10px 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
  }
  p {
    color: #62676d;
    font-size: 18px;
    line-height: 1.5;
    margin-top: 8px;
  }
  img {
    border-radius: 8px;
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  margin-bottom: 25px;
  align-self: flex-start;
  justify-self: stretch;
`;

export const Dropdown = styled.div`
  width: 75px;
  right: 0px;
  top: 55px;
  position: absolute;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 1px 6px 0 rgba(100, 105, 110, 0.3);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  width: 100%;
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
`;

export const InputContainer = styled.div`
  border-radius: 8px;
  background-color: ${props => (props.isActive ? 'white' : 'transparent')};
  box-shadow: ${props => (props.isActive ? '0 2px 4px 0 rgba(126, 126, 126, 0.17)' : '0')};
  transition: background-color 1000ms ease-out;
  transition: box-shadow 100ms ease-out;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
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

export const List = styled.ul`
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuLink = styled.a`
  padding: 12px;
  color: ${props => (props.blue ? 'white' : '#7f7f7f')};
  background-color: ${props => (props.blue ? '#0000ff' : 'transparent')};
  font-weight: 500;
  font-size: 16px;
  margin-left: 6px;
  transition: color 50ms ease-in-out;
  text-decoration: none;
  display: block;
  border-radius: 6px;

  &:hover {
    background-color: ${props => (props.blue ? '#0000af' : 'rgba(90, 100, 109, 0.05)')};
    color: ${props => (props.blue ? 'white' : '#404040')};
  }
`;

export const ProfileAvatar = styled.img`
  border-radius: 25px;
  height: 45px;
  width: 45px;
  display: inline-block;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  display: block;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 15px;
  border-radius: 6px;
  border: 0;
  cursor: ${props => (props.canSubmit ? 'pointer' : 'disabled')};
  background-color: ${props => (props.canSubmit ? '#0000ff' : 'rgba(0,0,255,0.2)')};
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${props => (props.canSubmit ? '#0000af' : 'rgba(0,0,255,0.2)')};
  }
`;

export const Text = styled.p`
  color: #62676d;
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 0;
`;

export const TextareaInput = styled(TextArea)`
  border: 0;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  min-height: 24px;
  padding: 15px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;
