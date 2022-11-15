import React, { useState } from "react";
import "./replyComment.css";
import CurrentUserR from "../currentUserC/CurrentUserR/CurrentUserR";
import moment from "moment";
import { nanoid } from "nanoid";

function ReplyComment({
  userImg,
  username,
  createAt,
  content,
  scores,
  replyingTo,
  setData,
  data,
  id,
  replyId,
  setDeleteMode,
  setSelectC,
  setSelectR,
}) {
  const [score, setScore] = useState(scores);
  const [plus, setplus] = useState(false);
  const [minus, setMinus] = useState(false);
  const [toggleReply, setToggleReply] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateText, setUpdateText] = useState(content);
  const plusScore = () => {
    if (!plus && !minus) {
      setScore(score + 1);
      setplus(true);
    } else if (!plus && minus) {
      setScore(score + 1);
      setMinus(false);
    }
  };
  const minusScore = () => {
    if (!minus && !plus) {
      setScore(score - 1);
      setMinus(true);
    } else if (!minus && plus) {
      setScore(score - 1);
      setplus(false);
    }
  };

  //replyFunc
  const replyToggle = () => {
    setToggleReply((prev) => !prev);
  };

  const [newReply, setNewReply] = useState(`@${username} `);

  const d = new Date().toString().split(" ")[4];
  const momentFromNow = moment(d, "hh:mm:ss").fromNow();

  let words = newReply.split(" ");
  let result = words.slice(1).join(" ");

  const replyComment = () => {
    const newCommentsState = data.comments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          replies: [
            ...c.replies,
            {
              id: nanoid(),
              content: result,
              createdAt: momentFromNow,
              score: 0,
              replyingTo: username,
              user: {
                image: {
                  png: "/images/avatars/image-juliusomo.png",
                  webp: "/images/avatars/image-juliusomo.webp",
                },
                username: "juliusomo",
              },
              replies: [],
            },
          ],
        };
      }
      return c;
    });

    setData((prev) => {
      return {
        ...prev,
        comments: newCommentsState,
      };
    });

    setToggleReply(false);
    setNewReply(`@${username} `);
  };

  //update function
  const updateFunc = () => {
    const updated = data.comments.map((c) => {
      if (c.id === id) {
        c.replies.map((r) => {
          if (r.id === replyId) {
            return {
              ...r,
              content: updateText,
            };
          }
          return r;
        });
      }
      return c;
    });

    setData((prev) => {
      return {
        ...prev,
        comments: updated,
      };
    });
    setEditMode(false);
  };

  return (
    <div className="reply">
      <div className="comments">
        <div className="comments-scores">
          <div className="score-div" onClick={plusScore}>
            <img src="./images/icons/icon-plus.svg" alt="plus" />
          </div>
          <p>{score}</p>
          <div className="score-div" onClick={minusScore}>
            <img src="./images/icons/icon-minus.svg" alt="minus" />
          </div>
        </div>
        <div className="comments-content">
          <div className="comments-content-top">
            <div className="comments-content-userInfo">
              <img src={userImg} alt="" />
              <p className="userInfo-userName">{username}</p>
              {username === "juliusomo" && <p className="you">you</p>}
              <p className="userInfo-createAt">{createAt}</p>
            </div>

            {username === "juliusomo" ? (
              <div className="userFunc">
                <div
                  className="deleteFunc"
                  onClick={() => {
                    setDeleteMode((prev) => !prev);
                    setSelectC(id);
                    setSelectR(replyId);
                  }}
                >
                  <img src="./images/icons/icon-delete.svg" alt="" />
                  <p>Delete</p>
                </div>
                <div
                  className="editFunc"
                  onClick={() => setEditMode((prev) => !prev)}
                >
                  <img src="./images/icons/icon-edit.svg" alt="" />
                  <p>Edit</p>
                </div>
              </div>
            ) : (
              <div className="comments-reply_icon" onClick={replyToggle}>
                <img src="./images/icons/icon-reply.svg" alt="" />
                <p>reply</p>
              </div>
            )}
          </div>

          {editMode ? (
            <div className="comments-content-bottom-edit">
              <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
              ></textarea>
              <button onClick={updateFunc}>Update</button>
            </div>
          ) : (
            <div className="comments-content-bottom">
              <p>
                <span>{`@${replyingTo}`}</span> {updateText}
              </p>
            </div>
          )}
        </div>
      </div>
      {toggleReply && (
        <CurrentUserR
          setNewReply={setNewReply}
          newReply={newReply}
          replyComment={replyComment}
        />
      )}
    </div>
  );
}

export default ReplyComment;
