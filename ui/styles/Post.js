import styled from 'styled-components';

export const Actions = styled.div`
  margin-top: 10px;
`;

export const AuthorName = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: #303030;
  margin: 0;
`;

export const Content = styled.p`
  font-weight: 300;
  margin-top: 5px;
  margin-bottom: 0;
  line-height: 1.5;
`;

export const DateArea = styled.div`
  color: #a2a2a2;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
`;

export const GreyButtonBox = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 10px;
  font-weight: 500;
  font-size: 14px;
  color: ${props => (props.active ? '#404040' : '#7f7f7f')};
  border-radius: 6px;
  background-color: rgba(90, 100, 109, 0.05);
  cursor: pointer;

  transition: background-color 50ms ease-in-out;
  transition: color 50ms ease-in-out;
  span {
    margin-left: 8px;
    text-decoration: none !important;
  }
  &:hover {
    background-color: rgba(90, 100, 109, 0.07);
    color: #404040;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const SimpleButton = styled.button`
  cursor: pointer;
`;

export const Tags = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const Username = styled.span`
  font-weight: 300;
  color: #a2a2a2;
`;
