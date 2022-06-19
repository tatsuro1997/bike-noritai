import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import HouseIcon from "../icons/house-icon";

import classes from "./record-item.module.css";

function RecordItem(props) {
  const {
    id,
    image,
    date,
    weather,
    temperature,
    running_time,
    distance,
    description,
    spotId,
  } = props;

  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/spots/" + spotId)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.spot.name);
      });
  }, [])

  const exploreLink = `/spots/${spotId}`;

  return (
    <Link href={exploreLink}>
      <a>
        <li className={classes.item}>
          {/* {image && (
            <Image
              src={`/uploads/records/${image}`}
              alt={name}
              width={400}
              height={250}
            />
          )}
          {!image && (
            <Image
              src={"/images/no_image.webp"}
              alt={name}
              width={400}
              height={250}
            />
          )} */}
          <div className={classes.content}>
            <div className={classes.summary}>
              <h2>{title}</h2>
            </div>
            <div className={classes.date}>
              <DateIcon />
              <time>{date}</time>
            </div>
            <div className={classes.type}>
              <span>天気：{weather}</span>
            </div>
            <div className={classes.type}>
              <span>気温：{temperature}度</span>
            </div>
            <div className={classes.type}>
              <span>走行時間：{running_time}時間</span>
            </div>
            <div className={classes.type}>
              <span>走行距離：{distance}km</span>
            </div>
            <div className={classes.type}>
              <span>{description}</span>
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
}

export default RecordItem;
