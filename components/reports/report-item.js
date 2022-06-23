import Link from "next/link";
import RankList from "./rank-list";
import ReportData from "./report-data";

import classes from "./report-item.module.css";

function ReportItem(props) {
  const { id, monthRecords } = props;

  const touringTimes = monthRecords.length;
  const totalDistance = monthRecords.reduce(function (sum, record) {
    return sum + Number(record.distance);
  }, 0);
  const totalRunningTime = monthRecords.reduce(function (sum, record) {
    return sum + Number(record.running_time);
  }, 0);
  const monthlyPace = touringTimes / 4;
  const averageDistance = totalDistance / touringTimes;
  const averageRunningTime = totalRunningTime / touringTimes;

  const month = new Date(monthRecords[0].date).getMonth() + 1;

  return (
    <li className={classes.item}>
      <div className={classes.card}>
        <div className={classes.title}>{month}月のツーリング</div>
        <div className={classes.content}>
          <ReportData
            touringTimes={touringTimes}
            totalDistance={totalDistance}
            monthlyPace={monthlyPace}
          />
        </div>
        <div className={classes.lank}>
          ランキング
          <RankList monthRecords={monthRecords} />
        </div>
        <div className={classes.average}>平均走行距離{averageDistance}km</div>
        <div className={classes.average}>
          平均走行時間{averageRunningTime}時間
        </div>
      </div>
    </li>
  );
}

export default ReportItem;
