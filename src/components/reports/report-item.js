import RankList from "./rank-list";
import ReportButtom from "./report-buttom";
import ReportData from "./report-data";
import classes from "./report-item.module.css";

const ReportItem = ({ monthRecords }) => {
  const touringTimes = monthRecords.length;
  const totalDistance = monthRecords.reduce(function (sum, record) {
    return sum + Number(record.distance);
  }, 0);
  const totalRunningTime = monthRecords.reduce(function (sum, record) {
    return sum + Number(record.running_time);
  }, 0);
  const monthlyPace = touringTimes / 4;
  const averageDistance =
    Math.floor((totalDistance / touringTimes) * 100) / 100;
  const averageRunningTime =
    Math.floor((totalRunningTime / touringTimes) * 100) / 100;
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
};

export default ReportItem;
