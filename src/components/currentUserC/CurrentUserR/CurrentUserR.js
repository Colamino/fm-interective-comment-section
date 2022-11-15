import React from "react";
import "./currentUserR.css";

function CurrentUserR({ setNewReply, newReply, replyComment }) {
  return (
    <div className="currentUserR">
      <div className="currentUserC">
        <img src="/images/avatars/image-juliusomo.png" alt="" />
        <textarea
          placeholder="Add a comment..."
          onChange={(e) => setNewReply(e.target.value)}
          value={newReply}
        ></textarea>
        <div className="btn">
          <button onClick={replyComment}>reply</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentUserR;
