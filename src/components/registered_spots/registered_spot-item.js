import Image from "next/image";
import Link from "next/link";

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import HouseIcon from "../icons/house-icon";

import classes from "./registered_spot-item.module.css";

function RegisteredSpotItem({ spot }) {
  const exploreLink = `/spots/${spot._id}`;

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

export default RegisteredSpotItem;