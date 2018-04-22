import App, { Container } from "next/app";
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export default class MyApp extends App {
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

  toggleModal = () => this.setState({ modal: !this.state.modal });

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {this.state.modal && <Overlay onClick={this.toggleModal} />}
        <Component toggleModal={this.toggleModal} {...pageProps} />
      </Container>
    );
  }
}
