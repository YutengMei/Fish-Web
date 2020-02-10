import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchComments, postComment } from "../../actions";
import TextArea from "./TextArea";

import _ from "lodash";
import "./forum.css";

import CommentField from "./CommentField";

class CommentForum extends Component {
  state = { message: "", open: false };

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
    return (
      <div className="comments">
        <div className="ui dividing header">
          <h1 id="comment-header">Discussion Board</h1>
          {/* <span id="comment-description">THIS FISH POST IS CREATED BY XXX</span> */}
        </div>
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
