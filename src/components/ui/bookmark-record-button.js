import BookmarkButton from "./bookmark-button";
import RecordButton from "./record-button";
import classes from "./bookmark-record-button.module.css";

const BookmarkAndRecordButton = ({ spotId, bookmarkCount }) => (
  <div className={classes.buttons}>
    <BookmarkButton spotId={spotId} bookmarkCount={bookmarkCount} />
    <RecordButton spotId={spotId} />
  </div>
);

export default BookmarkAndRecordButton;
