import Link from "next/link";
import RankList from "./rank-list";

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
        <div className={classes.title}>
          <div className={classes.title}>{month}月のツーリング</div>
        </div>
        <div className={classes.constent}>
          <div className={classes.data}>
            <dl className={classes.data_item}>
              <dt className={classes.handle_name}>ツーリング</dt>
              <dd className={classes.data_count}>
                <span className={classes.number}>{touringTimes}</span>
                <span className={classes.unit}>回</span>
              </dd>
            </dl>
            <dl className={classes.data_item}>
              <dt className={classes.handle_name}>総走行距離</dt>
              <dd className={classes.data_count}>
                <span className={classes.number}>{totalDistance}</span>
                <span className={classes.unit}>km</span>
              </dd>
            </dl>
            <dl className={classes.data_item}>
              <dt className={classes.handle_name}>週ペース</dt>
              <dd className={classes.data_count}>
                <span className={classes.number}>{monthlyPace}</span>
                <span className={classes.unit}>回</span>
              </dd>
            </dl>
          </div>
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
