import classes from "./report-data.module.css";

function ReportData(props) {
  const { touringTimes, totalDistance, monthlyPace } = props;
  return (
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
  );
}

export default ReportData;
