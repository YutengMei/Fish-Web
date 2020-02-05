import React, { useState } from "react";

const TextArea = props => {
  const [userInput, setUserInput] = useState("");

  function submitComent() {
    const comment = { commentBody: userInput, imageUrl: "" };
    props.handleSubmitComment(comment);
    setUserInput("");
  }

  return (
    <form className="ui reply form">
      <div className="field">
        <textarea
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        ></textarea>
      </div>
      <div
        className="ui blue labeled submit icon button"
        onClick={submitComent}
      >
        <i className="icon edit"></i> Add Comment
      </div>
    </form>
  );
};

export default TextArea;
