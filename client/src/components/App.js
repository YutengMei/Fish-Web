import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import Header from "./Header";
import MapShow from "./MapShow";
import SpotForm from "./spots/SpotForm";
import CommentForum from "./comments/CommentForum";
import Weather from "./weather/Weather";
import SolunarActivity from "./SolunarActivity";

class App extends Component {
  state = { DialogOpen: false, selectedSpotId: null };

  handleDialogOpen = event => {
    this.setState({ DialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ DialogOpen: false });
  };

  //For testing purposes, need to delete later!
  openForum = selectedSpotId => {
    this.setState({ selectedSpotId: selectedSpotId });
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
            <CommentForum spotId="5e38ed4a2f01e02f2524c4e0" />
            <SpotForm
              open={this.state.DialogOpen}
              onRequestClose={this.handleDialogClose}
            />
            {/* <Route path="/fishmap" exact component={MapShow} /> */}
            <Route
              path="/fishmap"
              render={props => (
                <MapShow {...props} openForum={this.openForum} />
              )}
            />
            <Route
              path="/weather"
              component={Weather}
            />
            <Route
              path="/solunar"
              component={SolunarActivity}
            />
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
