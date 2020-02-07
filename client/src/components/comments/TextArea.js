import React, { useState, useEffect } from "react";
import S3FileUpload from "react-s3";
import Grid from "@material-ui/core/Grid";

//Optional Import
import { uploadFile } from "react-s3";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "photos" /* optional */,
  region: process.env.REACT_APP_BUCKET_REGION,
  accessKeyId: process.env.REACT_APP_S3_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET
};

const TextArea = props => {
  const [userInput, setUserInput] = useState("");
  const [selectedfile, setSelectedfile] = useState(null);

  const submitComent = async () => {
    var imageUrl = "";
    if (selectedfile) {
      const imageObj = await S3FileUpload.uploadFile(selectedfile, config);
      imageUrl = imageObj.location;
    }
    const comment = {
      commentBody: userInput,
      imageUrl: imageUrl
    };
    if (comment.commentBody) {
      props.handleSubmitComment(comment);
      setUserInput("");
      setSelectedfile(null);
    }
  };

  const getImage = e => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedfile(file);
    }
  };

  useEffect(() => {}, [userInput]);

  return (
    <form className="ui reply form">
      <div className="field">
        <textarea
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        ></textarea>
      </div>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden"
          }}
        >
          <button className="ui blue labeled icon button">
            <input
              type="file"
              id="files"
              accept="image/*"
              onChange={getImage}
              style={{
                opacity: 0,
                fontSize: "100px",
                position: "absolute",
                left: 0,
                top: 0
              }}
            />
            <i className="icon image outline"></i> Attach Image
          </button>
          <span>{selectedfile == null ? "" : selectedfile.name}</span>
        </div>
        <div
          className="ui blue labeled submit icon button"
          onClick={submitComent}
        >
          <i className="icon edit"></i> Add Comment
        </div>
      </Grid>
    </form>
  );
};

export default TextArea;
