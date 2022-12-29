import Link from "next/link";
import RecordIcon from "../icons/record-icon";
import classes from "./record-button.module.css";

const RecordButton = ({ spotId }) => {
  const exploreLink = `/spots/${spotId}/create_record`;

  return (
    <button className={classes.record_btn}>
      <RecordIcon />
      <Link href={exploreLink}>記録する</Link>
    </button>
  );
}

export default RecordButton;
