import classes from "./report.module.css";

function Report(props) {
  const { thisMonthRecords } = props;

  const touringTimes = thisMonthRecords.length;
  const totalDistance = thisMonthRecords.reduce(function (sum, record) {
    return sum + Number(record.distance);
  }, 0);
  const monthlyPace = touringTimes / 4;

  return (
    <div className={classes.card}>
      <div className={classes.constent}>
        <div className={classes.title}>今月のツーリング</div>
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
    </div>
  );
}

export default Report;
