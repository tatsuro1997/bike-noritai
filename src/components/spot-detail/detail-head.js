import BookmarkAndRecordButton from "../ui/bookmark-record-button"
import classes from "./detail-head.module.css"

const DetailHead = ({ spotId, count }) => (
  <div className={classes.head}>
    <BookmarkAndRecordButton spotId={spotId} count={count} />
  </div>
);

export default DetailHead
