import Image from "next/image";
import Link from "next/link";
import AddressIcon from "../icons/address-icon";
import HouseIcon from "../icons/house-icon";
import LogisticsItem from "./logistics-item";
import classes from "./spot-logistics.module.css";
import Map from "../map/map";
import RecordList from "../records/record-list";
import BookmarkAndRecordButton from "../ui/bookmark-record-button";

const SpotLogistics = ({ spot, records, bookmarkCount }) => {
  const {
    _id,
    name,
    type,
    address,
    hp_url,
    parking,
    open_time,
    off_day,
    description,
    image,
    lat,
    lng,
  } = spot;
  const exploreLink = `/spots/${_id}/records`;

  return (
    <section className={classes.logistics}>
      <div className={classes.logistics_top}>
        <div className={classes.side_content}>
          <div className={classes.image}>
            {image && (
              <Image src={image} alt={name} width={320} height={200} priority />
            )}
            {!image && (
              <Image
                src={"/images/no_image.webp"}
                alt={name}
                width={320}
                height={200}
              />
            )}
          </div>
          {!lat && !lng && <p>まだ地図が登録されていません。</p>}
          <div className={classes.map}>
            <Map lat={lat} lng={lng} address={address} />
          </div>
        </div>
        <div className={classes.main}>
          <BookmarkAndRecordButton spotId={_id} bookmarkCount={bookmarkCount} />
          <ul className={classes.list}>
            <LogisticsItem icon={HouseIcon}>
              <p>{type}</p>
            </LogisticsItem>
            <LogisticsItem icon={AddressIcon}>
              <address>{address}</address>
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
  );
};

export default SpotLogistics;
