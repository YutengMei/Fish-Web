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

  getImage = e => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.setState({ file });
    }
  };

  uploadFile = e => {
    console.log("uploadFile called");
    e.preventDefault();
    const { file } = this.state;
    this.setState({ message: "Uploading..." });
    const contentType = file.type; // eg. image/jpeg or image/svg+xml

    const generatePutUrl = "/api/putImageUrl";
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        "Content-Type": contentType
      }
    };

    axios.get(generatePutUrl, options).then(res => {
      const {
        data: { putURL }
      } = res;
      console.log("This is the puturl we fetch", putURL);
      console.log("file to be put", file);
      axios
        .put(putURL, file, options)
        .then(res => {
          this.setState({ message: "Upload Successful" });
          setTimeout(() => {
            this.setState({ message: "" });
            document.querySelector("#upload-image").value = "";
          }, 2000);
        })
        .catch(err => {
          this.setState({ message: "Sorry, something went wrong" });
          console.log("err", err);
        });
    });
  };

  render() {
    console.log("comment forum rerender()");
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        {this.renderComments(this.props.comments)}
        <TextArea handleSubmitComment={this.handleSubmitComment} />
        <h1>Upload Image to ASW S3</h1>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={this.getImage}
        />
        <p>{this.state.message}</p>
        <form onSubmit={this.uploadFile}>
          <button id="file-upload-button">Upload</button>
        </form>
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
