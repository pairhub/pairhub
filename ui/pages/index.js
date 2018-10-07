import styled from "styled-components";
import Router, { withRouter } from "next/router";

import Layout from "../components/Layout";
import Posts from "../components/Posts";
import { Card } from "../components/styled";

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
  margin-bottom: 20px;

  &:hover {
    background: #0000af;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Text = styled.p`
  color: #666666;
  line-height: 22px;
  font-size: 16px;
`;

const Sidebar = styled.div``;

const Index = props => {
  // if (props.router.query.new) {
  //   //props.openModal("newPost");
  // }

  return (
    <Layout {...props}>
      <Grid>
        <Posts
          currentUser={props.currentUser}
          searchPhrase={props.router.query.s}
        />
        <Sidebar>
          <Button onClick={() => props.openModal("newPost")}>New post</Button>
          <Card>
            <CardTitle>👋 Welcome to PairHub!</CardTitle>
            <Text>
              PairHub is the friendly open source community to help you find
              remote pair programming partners.
            </Text>
            <Text>
              PairHub is for everyone, total beginners to developers with years
              of experience and from all backgrounds and places in the world.
            </Text>
            <Text>
              Take a look at our guide for remote pair programming, review our
              code of conduct, check out the source code, say hello in the chat!
            </Text>
          </Card>
        </Sidebar>
      </Grid>
    </Layout>
  );
};

export default withRouter(Index);
