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
        <img alt="commentImg" src={commentImgUrl} />
      </a>
    );
  };
  return (
    <div style={{ marginBottom: "5%" }}>
      <Grid
        container
        spacing={5}
        style={{ padding: "5%", paddingTop: "2%", position: "relative" }}
      >
        <Grid
          item
          xs={2}
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

        <Grid
          item
          xs={9}
          container
          direction="column"
          style={{ marginLeft: "5%" }}
        >
          {imageField(props.commentImgUrl)}
          <div class="text">{props.comment}</div>
        </Grid>
        <div
          class="metadata"
          style={{ position: "absolute", bottom: "23px", right: "36px" }}
        >
          <span className="date" style={{ opacity: "0.4", fontSize: ".875em" }}>
            {new Date(props.date).toLocaleDateString()}
          </span>
        </div>
      </Grid>
      <Divider variant="middle" />
    </div>
  );
};

export default CommentField;
