import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context/authContext";
import Start from "./components/Start/Start";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function App() {
  const context = useContext(AuthContext);
  const [comments, setComments] = useState();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    user_id: context.user !== null ? context.user.data.id : "",
  });

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://comments-section-rrich-kray.herokuapp.com"
      : "http://localhost:3001";

  useEffect(() => {
    fetch(`${baseUrl}/interactive-comments-section/api/comments`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setComments(data);
      })
      .catch((err) => {
        console.error("Error", err);
        console.log(err.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const submitComment = () => {
    fetch(`${baseUrl}/interactive-comments-section/api/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const vote = (commentId, actionType, upvoteUri, downvoteUri) => {
    fetch(actionType === "upvote" ? upvoteUri : downvoteUri, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: formState.user_id,
        comment_id: commentId,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error("Error", err);
      });
    window.location.replace("/");
  };

  console.log(comments);
  console.log(formState);

  return (
    <>
      {context.user === null && <Start baseUrl={baseUrl} />}
      <div className="app">
        <div className="comments-container">
          <div className="comments">
            {comments &&
              comments.map((comment) => (
                <div className="comment">
                  <div
                    className="up-arrow"
                    onClick={() =>
                      vote(
                        comment.id,
                        "upvote",
                        `${baseUrl}/interactive-comments-section/api/upvote`,
                        `${baseUrl}/interactive-comments-section/api/downvote`
                      )
                    }
                  >
                    <ThumbUpIcon />
                    {comment.upvotes.length}
                  </div>
                  <div
                    className="down-arrow"
                    onClick={() =>
                      vote(
                        comment.id,
                        "downvote",
                        `${baseUrl}/interactive-comments-section/api/upvote`,
                        `${baseUrl}/interactive-comments-section/api/downvote`
                      )
                    }
                  >
                    <ThumbDownAltIcon />
                    {comment.downvotes.length}
                  </div>
                  <div className="user">{`User:  ${comment.user.email}`}</div>
                  <h3>{comment.title}</h3>
                  <p>{comment.content}</p>
                </div>
              ))}
          </div>
          <div className="add-comment-container"></div>
          <form>
            <input
              name="title"
              id="title"
              onChange={handleChange}
              placeholder="Comment Title"
            ></input>
            <input
              className="add-comment"
              name="content"
              id="content"
              placeholder="Enter comment here"
              onChange={handleChange}
            ></input>
            <button className="submit-btn" onClick={() => submitComment()}>
              Submit!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
