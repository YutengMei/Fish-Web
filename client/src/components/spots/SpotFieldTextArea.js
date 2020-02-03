import React from "react";
import Grid from "@material-ui/core/Grid";

export default props => {
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={1} sm={1} style={{ marginLeft: "4%", marginRight: "5%" }}>
        <label>{props.label}</label>
      </Grid>
      <Grid item xs={6} sm={8}>
        <textarea
          rows="10"
          cols="70"
          {...props.input}
          style={{ marginBottom: "5px", marginTop: "20px" }}
        />
        <div className="red-text" style={{ marginBottom: "10px" }}>
          {props.meta.touched && props.meta.error}
        </div>
      </Grid>
    </Grid>
  );
};
