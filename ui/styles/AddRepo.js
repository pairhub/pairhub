import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

export const CancelIcon = styled(Icon)`
  margin-left: 10px;
  color: #7f7f7f;
  &:hover {
    color: #404040;
  }
`;

export const DownshiftInput = styled.input`
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

export const GreyBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  font-weight: 500;
  font-size: 16px;
  color: ${props => (props.active ? '#404040' : '#7f7f7f')};
  border-radius: 8px;
  background-color: ${props => (props.active ? 'rgba(90, 100, 109, 0.05)' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: rgba(90, 100, 109, 0.05);
    color: #404040;
  }
`;

export const RepoLabel = styled.span`
  margin-left: 10px;
`;

export const ResultList = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  position: absolute;
  left: -8px;
`;
