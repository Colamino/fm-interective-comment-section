import React from "react";
import "./modal.css";

function Modal({
  setDeleteMode,
  selectedC,
  setData,
  data,
  selectedR,
  setSelectR,
  setSelectC,
}) {
  const deleteFunc = () => {
    if (selectedR === "") {
      const newComments = data.comments.filter((c) => c.id !== selectedC);

      setData((prev) => {
        return {
          ...prev,
          comments: newComments,
        };
      });

      setSelectC("");
      setSelectR("");
    } else {
      const newReplies = data.comments.map((c) => {
        if (c.id === selectedC) {
          return { ...c, replies: c.replies.filter((r) => r.id !== selectedR) };
        }
        return c;
      });

      setData((prev) => {
        return {
          ...prev,
          comments: newReplies,
        };
      });
      setSelectC("");
      setSelectR("");
    }

    setDeleteMode(false);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <p className="heading">Delete comment</p>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="button-group">
          <button onClick={() => setDeleteMode((prev) => !prev)}>
            no, cancel
          </button>
          <button onClick={deleteFunc}>yes, delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
