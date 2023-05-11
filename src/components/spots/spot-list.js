import SpotItem from "./spot-item";
import classes from "./spot-list.module.css";

const SpotList = ({ items }) => (
  <ul className={classes.list}>
    {items.map((spot) => (
      <SpotItem
        key={spot.id}
        spot={spot}
      />
    ))}
  </ul>
);

export default SpotList;
