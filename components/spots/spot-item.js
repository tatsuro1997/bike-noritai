import Image from "next/image";

import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import HouseIcon from "../icons/house-icon";

import classes from "./spot-item.module.css";

function SpotItem(props) {
  const { id, name, type, prefecture, address1, open_time } = props;

  const exploreLink = `/spots/${id}`;

  return (
    <li className={classes.item}>
      {/* <Image src={"/" + image} alt={title} width={250} height={160} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{name}</h2>
        </div>
        <div className={classes.type}>
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
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Spot</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default SpotItem;
