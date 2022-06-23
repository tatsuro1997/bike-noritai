import Link from "next/link";

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
          <div className={classes.data}>
            <dl className={classes.data_item}>
              <dt className={classes.handle_name}>ツー</dt>
              <dd className={classes.data_count}>
                <span className={classes.number}>{touringTimes}</span>
                <span className={classes.unit}>回</span>
              </dd>
            </dl>
            <dl className={classes.data_item}>
              <dt className={classes.handle_name}>走行距離</dt>
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
      </div>
    </Link>
  );
}

export default Report;
