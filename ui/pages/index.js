import styled from "styled-components";

import Layout from "../components/Layout";
import withData from "../lib/withData";
import Posts from "../components/Posts";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-gap: 20px;
`;

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

  &:hover {
    background: #0000af;
  }
`;

const Sidebar = styled.div``;

const Index = props => (
  <Layout>
    <Grid>
      <Posts />
      <Sidebar>
        <Button onClick={props.toggleModal}>New post</Button>
      </Sidebar>
    </Grid>
  </Layout>
);

export default withData(Index);
