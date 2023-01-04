import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getBookmarkById } from "../../helpers/bookmark-api-util";
import BookmarkIcon from "../icons/bookmark-icon";
import BookmarkedIcon from "../icons/bookmarked-icon";
import classes from "./bookmark-button.module.css";

const BookmarkButton = ({ spotId, bookmarkCount }) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [countBookmark, setCountBookmark] = useState(bookmarkCount);
  const { data: session } = useSession();

  const getBookmarkData = async (uid) => {
    try {
      const bookmarkData = await getBookmarkById(uid, spotId);
      if (bookmarkData.length !== 0) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    } catch {
      console.log("Could not find Bookmark!");
    }
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        const uid = JSON.stringify(session.user.id);
        getBookmarkData(uid);
      }
    });
  }, []);

  const bookmarkHandler = async () => {
    setIsBookmarked((prevState) => !prevState);

    if (isBookmarked) {
      setCountBookmark((prevCount) => prevCount - 1);
    } else {
      setCountBookmark((prevCount) => prevCount + 1);
    }

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
  };

  let bookmarkButton;

  if (isBookmarked) {
    bookmarkButton = (
      <button className={classes.is_booked} onClick={bookmarkHandler}>
        <BookmarkedIcon />
        <p>イキタイ</p>
        <p>{countBookmark}</p>
      </button>
    );
  } else {
    bookmarkButton = (
      <button className={classes.is_not_booked} onClick={bookmarkHandler}>
        <BookmarkIcon />
        <p>イキタイ</p>
        <p>{countBookmark}</p>
      </button>
    );
  }

  return <>{bookmarkButton}</>;
};

export default BookmarkButton;
