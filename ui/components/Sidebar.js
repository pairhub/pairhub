import styled from "styled-components";
import { Card } from "../components/styled";

const Button = styled.button`
  background: #0000ff;
  width: 100%;
  display: block;
  color: white;
  font-size: 14px;
  padding: 18px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 0;
  cursor: pointer;
  transition: background-color 50ms ease-in-out;
  margin-bottom: 20px;

  &:hover {
    background: #0000af;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
`;

const Text = styled.p`
  color: #62676d;
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 0;
`;

const Sidebar = styled.div``;

export default props => (
  <Sidebar>
    <Card>
      <CardTitle>👋 Welcome to PairHub!</CardTitle>
      <Text>
        PairHub is the friendly open source community to help you find remote
        pair programming partners.
      </Text>
    </Card>
  </Sidebar>
);
