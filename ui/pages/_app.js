import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import styled, { injectGlobal } from "styled-components";

import withApolloClient from "../lib/withApolloClient";

import Header from "../components/Header";
import Modal from "../components/Modal";
import { initGA, logPageViews } from "../lib/analytics";

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

const MyApp = ({ Component, pageProps, apolloClient, router }) => {
  const [modal, setModal] = React.useState(null);

  React.useEffect(() => {
    initGA();
    logPageViews();
  }, []);

  const openModal = name => {
    if (modal !== name) setModal(name);
  };

  const closeModal = () => {
    setModal(null);
  };

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
              <Modal active={modal} closeModal={closeModal} />
              <MainLayout>
                <Header
                  currentUser={currentUser}
                  searchPhrase={router.query.s}
                />
                <Component
                  {...pageProps}
                  openModal={openModal}
                  activeModal={modal}
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
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withApolloClient(MyApp);
