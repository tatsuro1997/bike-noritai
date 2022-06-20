import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import BikeIcon from "../icons/bike";
import CloudSunIcon from "../icons/cloud-sun";

import DateIcon from "../icons/date-icon";
import StopWatchIcon from "../icons/spot-watch";
import ThermometerIcon from "../icons/thermometer";

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
    spot_id,
    uid,
  } = props;

  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/users/" + uid)
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.user.name);
      });
  }, []);

  useEffect(() => {
    fetch("/api/spots/" + spot_id)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.spot.name);
      });
  }, []);

  const exploreLink = `/spots/${spot_id}`;

  return (
    <Link href={exploreLink}>
      <a>
        <li className={classes.item}>
          <div className={classes.user_contents}>
            <Image
              src={"/images/no_image.webp"}
              alt={"プロフィール画像"}
              width={30}
              height={30}
            />
            <div className={classes.user_content}>
              <div className={classes.user_name}>{userName}</div>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.summary}>
              <h2>{title}</h2>
            </div>
            <div className={classes.date}>
              <DateIcon />
              <time>{date}</time>
            </div>
            <div className={classes.type}>
              <CloudSunIcon />
              <span>{weather}</span>
            </div>
            <div className={classes.type}>
              <ThermometerIcon />
              <span>{temperature}度</span>
            </div>
            <div className={classes.type}>
              <StopWatchIcon />
              <span>{running_time}時間</span>
            </div>
            <div className={classes.type}>
              <BikeIcon />
              <span>{distance}km</span>
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
