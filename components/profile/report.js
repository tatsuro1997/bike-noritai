import Link from "next/link";
import ReportData from "../reports/report-data";

import classes from "./report.module.css";

function Report(props) {
  const { thisMonthRecords, uid } = props;

  const touringTimes = thisMonthRecords.length;
  const totalDistance = thisMonthRecords.reduce(function (sum, record) {
    return sum + Number(record.distance);
  }, 0);
  const monthlyPace = touringTimes / 4;

  const exploreLink = `${uid}/report`;

  return (
    <Link href={exploreLink}>
      <div className={classes.card}>
        <div className={classes.content}>
          <div className={classes.content_top}>
            <div className={classes.title}>今月のツーリング</div>
            <div className={classes.guide}>レポート ＞</div>
          </div>
          <ReportData
            touringTimes={touringTimes}
            totalDistance={totalDistance}
            monthlyPace={monthlyPace}
          />
        </div>
      </div>
    </Link>
  );
}

export default Report;
