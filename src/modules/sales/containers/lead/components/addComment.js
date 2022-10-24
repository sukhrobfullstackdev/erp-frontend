import React, { useState } from "react";
import Icon from "../../../../../components/elements/icon";

const AddComment = ({ leadState, addCommit = () => {}, setFocus = () => {} }) => {
  const [commentText, setCommentText] = useState();
  const addCommentState = () => {
    console.table(leadState);
    if (commentText.length > 0 && leadState) {
      setCommentText("");
      addCommit(commentText);
    }
  };
  const handlingKye = (e) => {
    if (e.code === "Enter" && commentText.length > 0 && leadState) {
      e.preventDefault();
      setCommentText("");
      addCommit(commentText);
    }
  };
  return (
    <>
      <input
        value={commentText}
        onKeyPress={handlingKye}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        className="comment-input"
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Enter comment ..."
        name={"comment-input"}
      />
      <Icon icon="icon-send" color="#FCFCFD" onClick={() => addCommentState()} />
    </>
  );
};

export default AddComment;
