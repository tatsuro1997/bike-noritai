import Image from "next/image";
import Link from "next/link";

import AddressIcon from "../icons/address-icon";
import HouseIcon from "../icons/house-icon";
import LogisticsItem from "./logistics-item";
import classes from "./spot-logistics.module.css";

function SpotLogistics(props) {
  const {
    type,
    prefecture,
    address1,
    address2,
    hp_url,
    parking,
    open_time,
    off_day,
    image,
    imageAlt,
  } = props;

  return (
    <section className={classes.logistics}>
      {/* <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={320} height={320} />
      </div> */}
      <ul className={classes.list}>
        <LogisticsItem icon={HouseIcon}>
          <p>{type}</p>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{prefecture + " " + address1 + " " + address2}</address>
        </LogisticsItem>
        <li>
          <a href={hp_url} target="_blank" rel="noopener noreferrer">
            HP : {hp_url}
          </a>
        </li>
        <li>駐車場 : {parking}</li>
        <li>営業時間 : {open_time}</li>
        <li>定休日 : {off_day}</li>
      </ul>
    </section>
  );
}

export default SpotLogistics;
