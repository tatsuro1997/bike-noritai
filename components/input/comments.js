import { useState, useContext } from "react";
import { useRouter } from "next/router";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";

import classes from "./comments.module.css";

function Comments(props) {
  const { spotId, comments } = props;
  const router = useRouter();

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const { uid } = commentData;
    notificationCtx.showNotification({
      title: "Sending coments...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch("/api/comments/" + spotId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
        router.replace(`/users/${uid}`)
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        コメントを{showComments ? "閉じる" : "見る"}
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
