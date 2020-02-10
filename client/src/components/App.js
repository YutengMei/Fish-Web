import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import MapShow from "./map/MapShow";
import SpotForm from "./spots/SpotForm";
import CommentForum from "./comments/CommentForum";
import TidePrediction from "./tides/TidePrediction";
import * as actions from "../actions";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

class App extends Component {
  state = { DialogOpen: false };

  handleDialogOpen = event => {
    this.setState({ DialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ DialogOpen: false });
  };

  handleAlertClose = () => {
    this.props.removeError();
  };

  renderAlert = () => {
    return (
      <Dialog open="true" onClose={this.handleAlertClose}>
        <DialogContent>
          <div>
            <span>{this.props.errors[0]}</span>
          </div>
        </DialogContent>

        <DialogActions>
          <button className="ui button" onClick={this.handleAlertClose}>
            OK
          </button>
        </DialogActions>
      </Dialog>
    );
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
            <Route path="/tideChart" exact component={TidePrediction} />

            <Route
              path="/fishmap/forum/:spotId"
              exact
              render={({ match }) => (
                <CommentForum spotId={match.params.spotId} />
              )}
            />
          </div>
          {this.props.errors.length !== 0 && this.renderAlert()}
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errors: state.errors };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(App));
