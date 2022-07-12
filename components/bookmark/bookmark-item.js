import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSpotById } from "../../helpers/spot-api-util";

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import HouseIcon from "../icons/house-icon";

import classes from "./bookmark-item.module.css";

function BookmarkItem({ spotId }) {
  const [spot, setSpot] = useState("");

  const exploreLink = `/spots/${spotId}`;

  useEffect(() => {
    fetch("/api/spots/" + spotId)
      .then((response) => response.json())
      .then((data) => {
        setSpot(data.spot);
      });
  }, [spotId]);

  return (
    <Link href={exploreLink}>
      <a>
        <li className={classes.item}>
          {spot.image && (
            <Image
              src={`/uploads/spots/${spot.image}`}
              alt={spot.name}
              width={400}
              height={250}
            />
          )}
          {!spot.image && (
            <Image
              src={"/images/no_image.webp"}
              alt={spot.name}
              width={400}
              height={250}
            />
          )}
          <div className={classes.content}>
            <div className={classes.summary}>
              <h2>{spot.name}</h2>
            </div>
            <div className={classes.type}>
              <HouseIcon />
              <h3>{spot.type}</h3>
            </div>
            <div className={classes.date}>
              <DateIcon />
              <time>{spot.open_time}</time>
            </div>
            <div className={classes.address}>
              <AddressIcon />
              <address>{spot.prefecture + spot.address1}</address>
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
}

export default BookmarkItem;
