import React from "react";
import Grid from "@material-ui/core/Grid";

export default props => {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={6} sm={3}>
        <label>{props.label}</label>
      </Grid>
      <Grid item xs={6} sm={8}>
        <input
          {...props.input}
          style={{ marginBottom: "5px", marginTop: "20px" }}
        />
        <div className="ui red" style={{ marginBottom: "10px" }}>
          {props.meta.touched && props.meta.error}
        </div>
      </Grid>
    </Grid>
  );
};
