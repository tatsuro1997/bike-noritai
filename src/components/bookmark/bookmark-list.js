import BookmarkItem from "./bookmark-item";
import classes from "./bookmark-list.module.css";

const BookmarkList = ({ bookmarks }) => {
  return (
    <ul className={classes.list}>
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark._id}
          id={bookmark._id}
          spotId={bookmark.spot_id}
        />
      ))}
    </ul>
  );
}

export default BookmarkList;
