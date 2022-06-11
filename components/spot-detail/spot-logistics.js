import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AddressIcon from "../icons/address-icon";
import HouseIcon from "../icons/house-icon";
import LogisticsItem from "./logistics-item";
import classes from "./spot-logistics.module.css";

function SpotLogistics(props) {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    id,
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

  async function bookmarkHandler() {
    if (!session) {
      router.replace("/auth");
    }

    if (session) {
      const userId = JSON.stringify(session.user.id);
      const spotId = id.toString();

      await fetch("/api/bookmarks", {
        method: "POST",
        body: JSON.stringify({ userId, spotId }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {})
        .catch((error) => {
        console.log(error);
        });
    }
  }

  return (
    <>
      <button onClick={bookmarkHandler}>イキタイ</button>
      <section className={classes.logistics}>
        <div className={classes.image}>
          {image && (
            <Image
              src={`/uploads/spots/${image}`}
              alt={imageAlt}
              width={320}
              height={200}
            />
          )}
          {!image && (
            <Image
              src={"/images/no_image.webp"}
              alt={imageAlt}
              width={320}
              height={200}
            />
          )}
        </div>
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
    </>
  );
}

export default SpotLogistics;
