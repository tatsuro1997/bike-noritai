import Link from "next/link";

import RecordIcon from "../icons/record-icon";

import classes from "./record-button.module.css";

function RecordButton() {
  return (
    <button className={classes.record_btn}>
      <RecordIcon/>
      <Link href="/record/create">記録する</Link>
    </button>
  );
}

export default RecordButton;
