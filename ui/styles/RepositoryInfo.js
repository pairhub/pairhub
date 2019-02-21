import styled from 'styled-components';

export const RepositoryArea = styled.div`
  h1 {
  }
  h2 {
    font-weight: 400;
    color: #62676d;
    font-size: 16px;
    line-height: 1.5;
  }
  div {
    margin: 5px 0;
  }
  a {
    color: #666666;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: #0000ff;
    }
  }
  span {
    color: #666666;
  }
`;

export const Title = styled.h1`
  img {
    height: 26px;
    border-radius: 4px;
    margin-right: 8px;
  }
  line-height: 26px;
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  padding: 0;
  margin-bottom: 10px;
  color: #24292e;
  display: flex;
`;
