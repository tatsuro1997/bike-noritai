import Link from "next/link";
import RankList from "./rank-list";
import ReportButtom from "./report-buttom";
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
        <hr />
        <div className={classes.lank_list}>
          <RankList monthRecords={monthRecords} />
        </div>
        <hr />
        <ReportButtom
          averageDistance={averageDistance}
          averageRunningTime={averageRunningTime}
        />
      </div>
    </li>
  );
}

export default ReportItem;
