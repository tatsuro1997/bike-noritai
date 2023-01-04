import { useState, useContext } from "react";
import { useRouter } from "next/router";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "@/store/notification-context";
import classes from "./comments.module.css";

const Comments = ({ spotId, comments }) => {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    notificationCtx.showNotification({
      title: "コメント送信中...",
      message: "保存中です...",
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
      .then(() => {
        notificationCtx.showNotification({
          title: "コメントに成功しました!",
          message: "コメントを保存しました!",
          status: "success",
        });
        commentData.text = "";
        router.replace(`/spots/${spotId}`);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        コメントを{showComments ? "閉じる" : "見る"}
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
