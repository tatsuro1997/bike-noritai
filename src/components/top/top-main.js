import Image from "next/image";
import ClickableMap from "../map/clickable-map";
import SpotsSearch from "../spots/spots-search";
import classes from "./top-main.module.css";

const TopMain = () => (
  <div className={classes.control}>
    <div className={classes.background_image}>
      <Image
        src={"/images/bike1.jpg"}
        alt={"背景画像"}
        style={{ objectFit: "cover" }}
        fill
        priority
      />
    </div>
    <div className={classes.contents}>
      <h2>今から走りに行きたいスポットが見つかる検索サイト</h2>
      {/* <Image
          src={"/images/no_image.webp"}
          alt={"ロゴ"}
          width={550}
          height={300}
        /> */}
      <ClickableMap />
      <SpotsSearch />
    </div>
  </div>
);

export default TopMain;
