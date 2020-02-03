import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import Header from "./Header";
import MapShow from "./MapShow";
import SpotForm from "./spots/SpotForm";

class App extends Component {
  state = { DialogOpen: false };

  handleDialogOpen = event => {
    console.log("clicked");
    this.setState({ DialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ DialogOpen: false });
  };

  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header handleDialogOpen={this.handleDialogOpen} />
            <SpotForm
              open={this.state.DialogOpen}
              onRequestClose={this.handleDialogClose}
            />
            <Route path="/fishmap" exact component={MapShow} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
