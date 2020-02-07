import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import Header from "./Header";
import MapShow from "./map/MapShow";
import SpotForm from "./spots/SpotForm";
import CommentForum from "./comments/CommentForum";

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
    console.log("selectedId set in App component", this.state.selectedSpotId);
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
            <Route
              path="/fishmap"
              exact
              render={props => (
                <MapShow {...props} openForum={this.openForum} />
              )}
            />
            <Route
              path="/fishmap/forum/:spotId"
              exact
              render={({ match }) => (
                <CommentForum spotId={match.params.spotId} />
              )}
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
)(withRouter(App));
