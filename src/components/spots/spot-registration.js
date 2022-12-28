import Link from "next/link";
import PinMapIcon from "../icons/pin-map";
import classes from "./spot-registration.module.css";

const SpotRegistration = () => (
  <div className={classes.control}>
    <PinMapIcon />
    <Link href="/spots/create">
      <a className={classes.link}>スポット登録</a>
    </Link>
  </div>
);

export default SpotRegistration;
