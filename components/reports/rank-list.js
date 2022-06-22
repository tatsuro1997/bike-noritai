import LankItem from "./rank-item";

import classes from "./rank-list.module.css";

function RankList(props) {
  const { monthRecords } = props;

  return (
    <ul className={classes.list}>
      {monthRecords.length === 0 && <p> - </p>}
      {monthRecords.length >= 1 &&
        monthRecords.map((record) => (
          <LankItem
            key={record._id}
            id={record._id}
            distance={record.distance}
            spotId={record.spot_id}
          />
        ))}
    </ul>
  );
}

export default RankList;
