import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchComments, postComment } from "../../actions";
import TextArea from "./TextArea";
import axios from "axios";
import _ from "lodash";

import CommentField from "./CommentField";

class CommentForum extends Component {
  state = { message: "" };

  componentDidMount() {
    console.log("commentForum did mounth called");
    console.log(this.props.spotId);
    if (this.props.spotId !== null) {
      this.props.fetchComments(this.props.spotId);
    }
  }

  handleSubmitComment = userInput => {
    this.props.postComment(userInput, this.props.spotId);
  };

  //avatarImgUrl, userName, date, commentImgUrl, comment
  renderComments = comments => {
    console.log("renderComment called");
    return _.map(comments, comment => {
      return (
        <CommentField
          key={comment.dateCommented}
          userName={comment.author.userName}
          avatarImgUrl={comment.author.profileImageUrl}
          commentImgUrl={comment.imageUrl}
          comment={comment.commentBody}
          date={comment.dateCommented}
        />
      );
    });
  };

  render() {
    console.log("comment forum rerender()");
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        {this.renderComments(this.props.comments)}
        <TextArea handleSubmitComment={this.handleSubmitComment} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { comments: state.comments };
}
export default connect(
  mapStateToProps,
  { fetchComments, postComment }
)(CommentForum);
