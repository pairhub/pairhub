import App, { Container } from "next/app";
import React from "react";

import withData from "../lib/withData";
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Modal active={this.state.modal} closeModal={this.closeModal} />
        <Component {...pageProps} openModal={this.openModal} />
      </Container>
    );
  }
}

export default withData(MyApp);
