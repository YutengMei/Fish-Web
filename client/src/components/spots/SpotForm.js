import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SpotField from "./SpotField";
import SpotFieldTextArea from "./SpotFieldTextArea";
import _ from "lodash";
import formFields from "./formField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { postSpots } from "../../actions";
import { connect } from "react-redux";

class SpotForm extends Component {
  renderField(fieldName) {
    return _.map(formFields[fieldName], field => {
      return (
        <Field
          key={field.name}
          component={SpotField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  handleSubmitForm = formValues => {
    const location = { latitude: null, longtitude: null };
    if (formValues.latitude && formValues.longitude) {
      location.latitude = Number(formValues.latitude);
      location.longtitude = Number(formValues.longitude);
    } else {
    }
    this.props.postSpots(location);
  };

  render() {
    return (
      <div>
        <Dialog
          title="Test"
          fullWidth={true}
          maxWidth="md"
          open={this.props.open}
          onClose={this.props.onRequestClose}
        >
          <DialogTitle id="form-dialog-title">
            <h1>Discovered a new fishing spot?</h1>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add the fishing spot on the map, please enter either the
              address or coordinates.
            </DialogContentText>
            <form
              id="form-id"
              onSubmit={this.props.handleSubmit(values =>
                this.handleSubmitForm(values)
              )}
            >
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={5}>
                  {this.renderField("address")}
                </Grid>
                <Grid direction="column" justify="center" alignItems="center">
                  <Divider orientation="vertical" style={{ height: "130px" }} />
                  <div>or</div>
                  <Divider orientation="vertical" style={{ height: "130px" }} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  {this.renderField("coordinate")}
                </Grid>
              </Grid>
              <Field
                key="comment"
                component={SpotFieldTextArea}
                type="text"
                label="Comment"
                name="comment"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <button onClick={this.props.onRequestClose} className="ui button">
              Cancel
            </button>
            <button
              form="form-id"
              type="submit"
              className="ui secondary button"
            >
              Add Spot
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function validate(values) {
  var errors = {};
  _.each(formFields.address, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  console.log(errors);
  //lat: -90.0 to 90.0
  //lng: -180.0 to 180.0.
  _.each(formFields.coordinate, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    } else if (
      name === "latitude" &&
      (values[name] < -90 || values[name] > 90)
    ) {
      errors[name] = "You must enter a valid latitude";
    } else if (
      name === "longitude" &&
      (values[name] < -180 || values[name] > 180)
    ) {
      errors[name] = "You must enter a valid longitude";
    }
  });

  if (
    (!errors.longitude && !errors.latitude) ||
    (!errors.stressAdress && !errors.city && !errors.state && !errors.zip)
  ) {
    errors = {};
  }

  return errors;
}

export default connect(
  null,
  { postSpots }
)(
  reduxForm({
    form: "spotForm",
    validate: validate,
    destroyOnUnmount: true
  })(SpotForm)
);
