import React from "react";

export default props => {
  return (
    <React.Fragment>
      <div className="ui fluid input">
        <input
          {...props.input}
          type="text"
          autoComplete="off"
          placeholder={props.label}
        ></input>
      </div>
      <div style={{ marginBottom: "10px", color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </React.Fragment>
  );
};
