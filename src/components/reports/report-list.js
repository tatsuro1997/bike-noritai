import ReportItem from "./report-item";

import classes from "./report-list.module.css";

function ReportList(props) {
  const { thisMonthRecords, lastMonthRecords } = props;

  return (
    <div className={classes.card}>
      <ul className={classes.list}>
        {thisMonthRecords.length === 0 && <p>まだ今月レポートはありません。</p>}
        {thisMonthRecords.length >= 1 && (
          <ReportItem
            key={thisMonthRecords[0]._id}
            id={thisMonthRecords[0]._id}
            monthRecords={thisMonthRecords}
          />
        )}
        {lastMonthRecords.length === 0 && <p>先月レポートはありません。</p>}
        {lastMonthRecords.length >= 1 && (
          <ReportItem
            key={lastMonthRecords[0]._id}
            id={lastMonthRecords[0]._id}
            monthRecords={lastMonthRecords}
          />
        )}
      </ul>
    </div>
  );
}

export default ReportList;
