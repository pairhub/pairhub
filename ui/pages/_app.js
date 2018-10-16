import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import withApolloClient from "../lib/withApolloClient";
import Modal from "../components/Modal";
import "tippy.js/dist/tippy.css";

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
                  activeModal={this.state.modal}
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
