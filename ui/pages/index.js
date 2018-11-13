import { Component } from "react";
import Router from "next/router";

import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { Grid } from "../components/styled";

class Index extends Component {
  componentDidMount() {
    if (this.props.router.query.welcome === "") {
      this.props.openModal("welcome");
      Router.replace("/");
    }
  }

  render() {
    const { currentUser, router, openModal } = this.props;

    return (
      <Grid>
        <Posts currentUser={currentUser} searchPhrase={router.query.s} />
        <Sidebar currentUser={currentUser} openModal={openModal} />
      </Grid>
    );
  }
}

export default Index;
