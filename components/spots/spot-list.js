import SpotItem from "./spot-item";
import classes from "./spot-list.module.css";

function SpotList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((spot) => (
        <SpotItem
          key={spot._id}
          id={spot._id}
          name={spot.name}
          type={spot.type}
          prefecture={spot.prefecture}
          address1={spot.address1}
          open_time={spot.open_time}
          image={spot.image}
        />
      ))}
    </ul>
  );
}

export default SpotList;
