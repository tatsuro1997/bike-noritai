import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import classes from "./new-comment.module.css";

const NewComment = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  let userId;
  let userName;
  let commentInputRef = useRef();

  if (!session) {
    router.replace("/auth");
  }

  if (session) {
    userId = session.user.id;
    userName = session.user.name;
  }

  const sendCommentHandler = (event) => {
    event.preventDefault();
    const enteredComment = commentInputRef.current.value;

    if (
      !userId ||
      !userName ||
      userName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      uid: userId,
      name: userName,
      text: enteredComment,
    });

    commentInputRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.control}>
        <label htmlFor="comment">コメント</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>コメントする</button>
    </form>
  );
}

export default NewComment;
