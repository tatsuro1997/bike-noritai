import BookmarkButton from "./bookmark-button";
import RecordButton from "./record-button";

import classes from "./bookmark-record-button.module.css"

function BookmarkAndRecordButton({spotId, count}) {
  return (
    <div className={classes.buttons}>
      <BookmarkButton spotId={spotId} count={count} />
      <RecordButton spotId={spotId} />
    </div>
  );
}

export default BookmarkAndRecordButton
