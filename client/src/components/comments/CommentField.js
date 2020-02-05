import React from "react";

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
    <div className="comment">
      <a className="avatar">
        <img src={props.avatarImgUrl} />
      </a>
      <div className="content">
        <a className="author">{props.userName}</a>
        <div class="metadata">
          <span className="date">{props.date}</span>
        </div>
        {imageField(props.commentImgUrl)}
        <div class="text">{props.comment}</div>
      </div>
    </div>
  );
};

export default CommentField;
