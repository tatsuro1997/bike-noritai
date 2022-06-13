import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { getBookmarkById } from "../../helpers/bookmark-api-util";
import BookmarkIcon from "../icons/bookmark-icon";
import BookmarkedIcon from "../icons/bookmarked-icon";

import classes from "./bookmark-button.module.css";

function BookmarkButton(props) {
  const router = useRouter();
  const [isBookmarkd, setIsBookmarkd] = useState(false);
  const { spotId, count } = props;
  const { data: session } = useSession();

  async function getBookmarkData(uid) {
    try {
      const bookmarkData = await getBookmarkById(uid, spotId);
      if (bookmarkData.length !== 0) {
        setIsBookmarkd(true);
      } else {
        setIsBookmarkd(false);
      }
    } catch {
      res.status(500).json({
        message: "Could not find Bookmark!",
      });
      return;
    }
  }

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        const uid = JSON.stringify(session.user.id);
        getBookmarkData(uid);
      }
    });
  }, []);

  async function bookmarkHandler() {
    setIsBookmarkd((prevState) => !prevState);

    if (!session) {
      router.replace("/auth");
    }

    if (session) {
      const userId = JSON.stringify(session.user.id);

      await fetch("/api/bookmarks", {
        method: "POST",
        body: JSON.stringify({ userId, spotId }),
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

  let bookmarkButton;

  if (isBookmarkd) {
    bookmarkButton = (
      <button className={classes.is_booked} onClick={bookmarkHandler}>
        <BookmarkIcon />
        <p>イキタイ</p>
        <p>{count}</p>
      </button>
    );
  } else {
    bookmarkButton = (
      <button className={classes.is_not_booked} onClick={bookmarkHandler}>
        <BookmarkedIcon />
        <p>イキタイ</p>
        <p>{count}</p>
      </button>
    );
  }

  return <>{bookmarkButton}</>;
}

export default BookmarkButton;
