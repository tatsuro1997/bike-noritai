import { useRouter } from "next/router";

import classes from "./report-data.module.css";

function ReportData(props) {
  const router = useRouter();
  const route = router.asPath;

  let switchClass;
  if (route.slice(-6) === 'report') {
    switchClass = classes.report_data;
  } else {
    switchClass = classes.data_count;
  }

  const { touringTimes, totalDistance, monthlyPace } = props;
  return (
    <div className={classes.data}>
      <dl className={classes.data_item}>
        <dt className={classes.handle_name}>ツー</dt>
        <dd className={switchClass}>
          <span className={classes.number}>{touringTimes}</span>
          <span className={classes.unit}>回</span>
        </dd>
      </dl>
      <dl className={classes.data_item}>
        <dt className={classes.handle_name}>走行距離</dt>
        <dd className={switchClass}>
          <span className={classes.number}>{totalDistance}</span>
          <span className={classes.unit}>km</span>
        </dd>
      </dl>
      <dl className={classes.data_item}>
        <dt className={classes.handle_name}>週ペース</dt>
        <dd className={switchClass}>
          <span className={classes.number}>{monthlyPace}</span>
          <span className={classes.unit}>回</span>
        </dd>
      </dl>
    </div>
  );
}

export default ReportData;
