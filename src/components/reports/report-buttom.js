import classes from "./report-buttom.module.css";

function ReportButtom(props) {
  const { averageDistance, averageRunningTime } = props;

  return (
    <div className={classes.buttom_comtent}>
      <dl className={classes.data}>
        <dt className={classes.handle_name}>平均走行距離</dt>
        <dd className={classes.data_count}>
          <span className={classes.number}>{averageDistance}</span>
          <span className={classes.unit}>km</span>
        </dd>
      </dl>
      <dl className={classes.data}>
        <dt className={classes.handle_name}>平均走行時間</dt>
        <dd className={classes.data_count}>
          <span className={classes.number}>{averageRunningTime}</span>
          <span className={classes.unit}>時間</span>
        </dd>
      </dl>
    </div>
  );
}

export default ReportButtom;
