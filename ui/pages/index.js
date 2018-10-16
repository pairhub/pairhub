import { Component } from "react";
import styled from "styled-components";
import Router, { withRouter } from "next/router";

import Layout from "../components/Layout";
import Posts from "../components/Posts";
import { Card, Grid } from "../components/styled";

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

class Index extends Component {
  componentDidMount() {
    if (this.props.router.query.welcome === "") {
      this.props.openModal("welcome");
      Router.replace("/");
    }
  }

  render() {
    return (
      <Layout {...this.props}>
        <Grid>
          <Posts
            currentUser={this.props.currentUser}
            searchPhrase={this.props.router.query.s}
          />
          <Sidebar>
            {this.props.currentUser ? (
              <Button onClick={() => this.props.openModal("newPost")}>
                New post
              </Button>
            ) : (
              <Card>
                <CardTitle>👋 Welcome to PairHub!</CardTitle>
                <Text>
                  PairHub is the friendly open source community to help you find
                  remote pair programming partners.
                </Text>

                <Text>
                  Take a look at our guide for remote pair programming, review
                  our code of conduct, check out the source code, say hello in
                  the chat!
                </Text>
              </Card>
            )}
          </Sidebar>
        </Grid>
      </Layout>
    );
  }
}

export default withRouter(Index);
