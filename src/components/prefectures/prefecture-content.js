import PrefectureList from "./prefecture-list";
import classes from "./prefecture-content.module.css";

const PrefectureContent = () => (
  <div className={classes.wrapper}>
    <div className={classes.title}>都道府県からスポットを探す</div>
    <PrefectureList />
  </div>
);

export default PrefectureContent;
