import moment from "moment";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import "./comments.css";
import CurrentUserR from "./currentUserC/CurrentUserR/CurrentUserR";
import ReplyComment from "./replyComment/ReplyComment";

function Comments({
  userImg,
  username,
  createAt,
  content,
  scores,
  replies,
  setData,
  id,
  data,
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
    const updatedText = data.comments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          content: updateText,
        };
      }
      return c;
    });

    setData((prev) => {
      return {
        ...prev,
        comments: updatedText,
      };
    });
    setEditMode(false);
  };

  return (
    <div className="comments-section">
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
              <p>{content}</p>
            </div>
          )}
        </div>
      </div>
      <div className="comment-replied">
        {toggleReply && (
          <div className="comment-replied-currentUser">
            <hr />
            <CurrentUserR
              setNewReply={setNewReply}
              newReply={newReply}
              replyComment={replyComment}
            />
          </div>
        )}
        {replies?.map((reply, i, array) => {
          return (
            <div className="comment-replied-map" key={reply.id}>
              <hr />

              <ReplyComment
                key={reply.id}
                userImg={reply.user.image.png}
                username={reply.user.username}
                createAt={reply.createdAt}
                content={reply.content}
                scores={reply.score}
                replies={reply.replies}
                replyingTo={reply.replyingTo}
                setData={setData}
                data={data}
                id={id}
                replyId={reply.id}
                setDeleteMode={setDeleteMode}
                setSelectC={setSelectC}
                setSelectR={setSelectR}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
