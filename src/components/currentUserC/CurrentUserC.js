import React, { useState } from "react";
import "./currentUserC.css";
import { nanoid } from "nanoid";
import moment from "moment";

function CurrentUserC({ setData }) {
  const [newComment, setNewComment] = useState("");
  const d = new Date().toString().split(" ")[4];

  const momentFromNow = moment(d, "hh:mm:ss").fromNow();

  const addComment = () => {
    setData((prev) => {
      return {
        ...prev,
        comments: [
          ...prev.comments,
          {
            id: nanoid(),
            content: newComment,
            createdAt: momentFromNow,
            score: 0,
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
            replies: [],
          },
        ],
      };
    });
    setNewComment("");
  };
  return (
    <div className="currentUserC">
      <img src="./images/avatars/image-juliusomo.png" alt="" />
      <textarea
        placeholder="Add a comment..."
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      ></textarea>
      <div className="btn">
        <button onClick={addComment}>send</button>
      </div>
    </div>
  );
}

export default CurrentUserC;
