import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import HeartIcon from "../icons/heart";
import HeartFullIcon from "../icons/heart-full";
import classes from "./record-like-button.module.css";
import { getRecordLikeById, getRecordLikeCount } from "../../helpers/record-like-api-util";

function RecordLikeButton(props) {
  const { recordId, count } = props;
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [countLike, setCountLike] = useState(count);
  // エラーがでるので一旦コメント
  // const { data: session } = useSession();

  async function getRecordData(uid) {
    try {
      const likeData = await getRecordLikeById(uid, recordId);
      if (likeData.length !== 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch {
      console.log("Could not find RecordLike!");
      return;
    }
  }

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        const uid = JSON.stringify(session.user.id);
        getRecordData(uid);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      setCountLike(await getRecordLikeCount(recordId));
    })();
  }, []);

  async function bookmarkHandler(e) {
    e.preventDefault()
    setIsLiked((prevState) => !prevState);

    if (isLiked) {
      setCountLike((prevCount) => prevCount - 1);
    } else {
      setCountLike((prevCount) => prevCount + 1);
    }

    if (!session) {
      router.replace("/auth");
    }

    if (session) {
      const userId = JSON.stringify(session.user.id);

      await fetch("/api/record-likes", {
        method: "POST",
        body: JSON.stringify({ userId, recordId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }

  let recordLikeButton;

  if (isLiked) {
    recordLikeButton = (
      <div className={classes.is_liked} onClick={bookmarkHandler}>
        <HeartFullIcon />
        <p>{countLike}</p>
      </div>
    );
  } else {
    recordLikeButton = (
      <div className={classes.is_not_liked} onClick={bookmarkHandler}>
        <HeartIcon />
        <p>{countLike}</p>
      </div>
    );
  }

  return <>{recordLikeButton}</>;
}

export default RecordLikeButton;
