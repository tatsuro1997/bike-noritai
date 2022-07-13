import RegisteredSpotItem from "./regitsered_spot-item";

import classes from "./bookmark-list.module.css";

function RegisteredSpotList({ spots }) {
  return (
    <ul className={classes.list}>
      {spots.map((spot) => (
        <RegisteredSpotItem key={spot._id} id={spot._id} spot={spot} />
      ))}
    </ul>
  );
}

export default RegisteredSpotList;
