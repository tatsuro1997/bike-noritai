import Image from "next/image";
import { useRouter } from "next/router";

import SpotsSearch from "../spots/spots-search";

import classes from "./top-main.module.css";

function TopMain() {
  const router = useRouter();

  function findSpotsHandler(year, month) {
    const fullPath = `/spots/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <div className={classes.control}>
        <div className={classes.background_image}>
          <Image
            src={"/images/bike1.jpg"}
            alt={"背景画像"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={classes.contents}>
          <h2>今から走りに行きたいスポットが見つかる検索サイト</h2>
          <Image
            src={"/images/no_image.webp"}
            alt={"ロゴ"}
            width={550}
            height={300}
          />
          <SpotsSearch onSearch={findSpotsHandler} />
        </div>
      </div>
    </>
  );
}

export default TopMain;
