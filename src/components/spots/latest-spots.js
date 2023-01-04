import SpotList from "./spot-list";
import classes from "./latest-spots.module.css";

const LatestSpots = ({ spots }) => {
  const slicedSpots = spots.slice(0, 3);

  return (
    <>
      <div className={classes.title}>新着スポット</div>
      <SpotList items={slicedSpots || spots} />
    </>
  );
};

export default LatestSpots;
