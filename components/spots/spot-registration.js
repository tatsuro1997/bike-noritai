import Link from "next/link";

import classes from "./spot-registration.module.css";

function SpotRegistration() {
  return (
    <div className={classes.control}>
      <Link href="/spots/create">
        <a className={classes.link}>スポット登録</a>
      </Link>
    </div>
  );
}

export default SpotRegistration;
