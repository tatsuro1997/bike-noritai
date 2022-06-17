import Link from "next/link";

import classes from "./record-button.module.css";

function RecordButton() {

  return (
    <div className={classes.record_btn}>
      <Link href="/record/create">
        <button>記録する</button>
      </Link>
    </div>
  );
}

export default RecordButton;
