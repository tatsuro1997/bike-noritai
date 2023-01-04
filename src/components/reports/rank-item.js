import { useEffect, useState } from "react";
import classes from "./rank-item.module.css";

const RankItem = ({ distance, spotId }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/spots/" + spotId)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.spot.name);
      });
  }, [spotId]);

  return (
    <li className={classes.item}>
      <div>{title}</div>
      <div>{distance}km</div>
    </li>
  );
};

export default RankItem;
