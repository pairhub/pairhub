import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import styled, { injectGlobal } from "styled-components";

import withApolloClient from "../lib/withApolloClient";

import Header from "../components/Header";
import Modal from "../components/Modal";

import "tippy.js/dist/tippy.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
fontAwesomeConfig.autoAddCss = false;

injectGlobal`
  body {
    padding: 0;
    margin: 0;
    background: #f4f5f6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
  a {
    color: #0000FF;
    cursor: pointer;
  }
`;

const MainLayout = styled.div`
  display: grid;
  max-width: 940px;
  margin: 0 auto;
  padding: 0 20px;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  justify-content: center;
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  state = {
    modal: null
  };

  openModal = name => {
    if (this.state.modal !== name) this.setState({ modal: name });
  };

  closeModal = () => {
    this.setState({ modal: null });
  };

  render() {
    const { Component, pageProps, apolloClient, router } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Query
            query={gql`
              query currentUser {
                currentUser {
                  _id
                  avatar_url
                  userId
                  username
                }
              }
            `}
          >
            {({ data: { currentUser } }) => (
              <>
                <Modal active={this.state.modal} closeModal={this.closeModal} />
                <MainLayout>
                  <Header
                    currentUser={currentUser}
                    searchPhrase={router.query.s}
                  />
                  <Component
                    {...pageProps}
                    openModal={this.openModal}
                    activeModal={this.state.modal}
                    currentUser={currentUser}
                    router={router}
                  />
                </MainLayout>
              </>
            )}
          </Query>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
