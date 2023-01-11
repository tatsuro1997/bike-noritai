import SpotItem from "./spot-item";
import classes from "./spot-list.module.css";

const SpotList = ({ items }) => (
  <ul className={classes.list}>
    {items.map((spot) => (
      <SpotItem
        key={spot._id}
        id={spot._id}
        name={spot.name}
        type={spot.type}
        address={spot.address}
        open_time={spot.open_time}
        image={spot.image}
      />
    ))}
  </ul>
);

export default SpotList;
