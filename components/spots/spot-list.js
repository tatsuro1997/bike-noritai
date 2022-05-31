import SpotItem from "./spot-item";
import classes from "./spot-list.module.css";

function SpotList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((spot) => (
        <SpotItem
          key={spot.id}
          id={spot.id}
          title={spot.title}
          location={spot.location}
          date={spot.date}
          image={spot.image}
        />
      ))}
    </ul>
  );
}

export default SpotList;
