import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecordLikeById } from "../../helpers/record-like-api-util";

import BikeIcon from "../icons/bike";
import CloudSunIcon from "../icons/cloud-sun";
import StopWatchIcon from "../icons/spot-watch";
import ThermometerIcon from "../icons/thermometer";
import RecordLikeButton from "../ui/record-like-button";

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
  const [count, setCount] = useState()

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
      }).catch((error) => console.log(error));
  }, []);

  const exploreLink = `/spots/${spot_id}`;
  const userLink = `/users/${uid}`;

  return (
    <Link href={exploreLink}>
      <a>
        <li className={classes.item}>
          <div className={classes.user_contents}>
            <Link href={userLink}>
              {/* WarmingがでないようにFragmentで囲っている（Linkが効かないので変更の必要あり） */}
              <>
                <Image
                  src={"/images/no_image.webp"}
                  alt={"プロフィール画像"}
                  width={40}
                  height={40}
                />
              </>
            </Link>
            <div className={classes.user_content}>
              <Link href={userLink}>
                <div className={classes.user_name}>{userName}</div>
              </Link>
              <div className={classes.date}>
                <div>{date}にツーリング</div>
              </div>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.title}>
              <div>{title}</div>
            </div>
            <div className={classes.data}>
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
            </div>
            <div className={classes.description}>
              <span>{description}</span>
            </div>
            <RecordLikeButton recordId={id} />
          </div>
        </li>
      </a>
    </Link>
  );
}

export default RecordItem;
