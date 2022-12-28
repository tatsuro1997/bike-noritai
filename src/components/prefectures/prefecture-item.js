import Link from "next/link";
import classes from "./prefecture-item.module.css";

const PrefectureItem = ({ area, prefectures }) => (
  <li className={classes.list}>
    <div className={classes.area}>{area}</div>
    <ul className={classes.prefecture_ul}>
      {prefectures &&
        prefectures.map((prefecture) => (
          <li key={Math.random()} className={classes.prefecture_li}>
            <Link href={`/spots/search/${prefecture}`}>
              <a>{prefecture}のスポット</a>
            </Link>
          </li>
        ))}
    </ul>
  </li>
);

export default PrefectureItem;
