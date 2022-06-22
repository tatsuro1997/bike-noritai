import Link from "next/link";
import { useEffect, useState } from "react";

import classes from "./rank-item.module.css";

function RankItem(props) {
  const { id, distance, spotId } = props;
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/spots/" + spotId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTitle(data.spot.name);
      });
  }, []);

  return (
    <li className={classes.item}>
      <div>
        <div>{title}</div>
        <div>{distance}km</div>
      </div>
    </li>
  );
}

export default RankItem;
