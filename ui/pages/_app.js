import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import withApolloClient from "../lib/withApolloClient";
import Modal from "../components/Modal";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  state = {
    modal: false
  };

  openModal = name => {
    this.setState({ modal: name });
  };

  closeModal = () => {
    this.setState({ modal: null });
  };

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Query
            query={gql`
              {
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
                <Component
                  {...pageProps}
                  openModal={this.openModal}
                  currentUser={currentUser}
                />
              </>
            )}
          </Query>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
