import BookmarkAndRecordButton from "../ui/bookmark-record-button"
import classes from "./detail-head.module.css"

const DetailHead = ({ spotId, bookmarkCount }) => (
  <div className={classes.head}>
    <BookmarkAndRecordButton spotId={spotId} bookmarkCount={bookmarkCount} />
  </div>
);

export default DetailHead
