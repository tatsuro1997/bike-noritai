import Image from "next/image";
import Link from "next/link";

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import HouseIcon from "../icons/house-icon";

import classes from "./record-item.module.css";

function RecordItem(props) {
  const { id, image, date, type, prefecture, address1, open_time } = props;

  const exploreLink = `/records/${id}`;

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
              <h2>{date}</h2>
            </div>
            {/* <div className={classes.type}>
              <HouseIcon />
              <h3>{type}</h3>
            </div>
            <div className={classes.date}>
              <DateIcon />
              <time>{open_time}</time>
            </div>
            <div className={classes.address}>
              <AddressIcon />
              <address>{prefecture + address1}</address>
            </div> */}
          </div>
        </li>
      </a>
    </Link>
  );
}

export default RecordItem;
