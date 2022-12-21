import RecordList from "./record-list";

import classes from './latest-records.module.css';

function LatestRecords({ records }) {
  const slicedRecords = records.slice(0, 3);

  return (
    <>
      <div className={classes.title}>新着ツー</div>
      <RecordList items={slicedRecords || records} />
    </>
  );
}

export default LatestRecords;
