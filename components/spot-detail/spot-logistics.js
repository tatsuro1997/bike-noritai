import Image from "next/image";
import Link from "next/link";

import AddressIcon from "../icons/address-icon";
import HouseIcon from "../icons/house-icon";
import LogisticsItem from "./logistics-item";
import classes from "./spot-logistics.module.css";
import Map from "../map/map";
import RecordList from "../records/record-list";
import BookmarkAndRecordButton from "../ui/bookmark-record-button";

function SpotLogistics(props) {
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
    description,
    image,
    imageAlt,
    count,
    lat,
    lng,
    records,
  } = props;

  const exploreLink = `/spots/${id}/records`

  return (
    <>
      <section className={classes.logistics}>
        <div className={classes.logistics_top}>
          <div className={classes.side_content}>
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
            {!lat && !lng && <p>まだ地図が登録されていません。</p>}
            <div className={classes.map}>
              <Map
                lat={lat}
                lng={lng}
                prefecture={prefecture}
                address1={address1}
                address2={address2}
              />
            </div>
          </div>
          <div className={classes.main}>
            <BookmarkAndRecordButton spotId={id} count={count} />
            <ul className={classes.list}>
              <LogisticsItem icon={HouseIcon}>
                <p>{type}</p>
              </LogisticsItem>
              <LogisticsItem icon={AddressIcon}>
                <address>
                  {prefecture + " " + address1 + " " + address2}
                </address>
              </LogisticsItem>
              <li>
                <a href={hp_url} target="_blank" rel="noopener noreferrer">
                  HP : {hp_url}
                </a>
              </li>
              <li>駐車場 : {parking}</li>
              <li>営業時間 : {open_time}</li>
              <li>定休日 : {off_day}</li>
              <li>{description}</li>
            </ul>
          </div>
        </div>

        <div className={classes.logistics_contents}>
          <RecordList items={records} />
          <div className={classes.other_link}>
            <Link href={exploreLink}>
              <a>記録をもっとみる ＞</a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default SpotLogistics;
