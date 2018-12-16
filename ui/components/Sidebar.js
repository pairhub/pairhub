import styled from "styled-components";
import { Card } from "../components/styled";

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

export default () => (
  <div>
    <Card>
      <CardTitle>👋 Welcome to PairHub!</CardTitle>
      <Text>
        PairHub is the friendly open source community to help you find remote
        pair programming partners.
      </Text>
    </Card>
  </div>
);
