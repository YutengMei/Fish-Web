import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const CommentField = props => {
  const imageField = commentImgUrl => {
    if (!commentImgUrl || commentImgUrl === "") {
      return;
    }
    return (
      <a className="ui medium image">
        <img src={commentImgUrl} />
      </a>
    );
  };
  return (
    <div style={{ marginBottom: "5%" }}>
      <Divider variant="middle" />
      <Grid
        container
        spacing={5}
        style={{ padding: "5%", position: "relative" }}
      >
        <Grid
          item
          xs={3}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Avatar alt={props.userName} src={props.avatarImgUrl} />
          <div style={{ marginTop: "10%" }}>
            <a className="author">{props.userName}</a>
          </div>
        </Grid>

        <Grid item xs={8} container direction="column">
          {imageField(props.commentImgUrl)}
          <div class="text">{props.comment}</div>
        </Grid>
        <div
          class="metadata"
          style={{ position: "absolute", bottom: 0, right: "36px" }}
        >
          <span className="date" style={{ opacity: "0.4", fontSize: ".875em" }}>
            {new Date(props.date).toLocaleDateString()}
          </span>
        </div>
      </Grid>
    </div>
  );
};

export default CommentField;
