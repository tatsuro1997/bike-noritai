import RegisteredSpotItem from "./registered_spot-item";
import classes from "./registered_spot-list.module.css";

const RegisteredSpotList = ({ spots }) => (
  <ul className={classes.list}>
    {spots.map((spot) => (
      <RegisteredSpotItem key={spot._id} id={spot._id} spot={spot} />
    ))}
  </ul>
);

export default RegisteredSpotList;
