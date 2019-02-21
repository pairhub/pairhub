import styled from 'styled-components';

export const Arrow = styled.div`
  font-size: 50px;
  color: ${props => (props.active ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0,0,0,0)')};
  padding: 20px;
  cursor: ${props => (props.active ? 'pointer' : 'default')};
  &:hover {
    color: ${props => (props.active ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0)')};
  }
`;

export const ProgressDot = styled.div`
  cursor: pointer;
  color: ${props => (props.filled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)')};
  padding: 5px;
  font-size: 14px;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
`;
