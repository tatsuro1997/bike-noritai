import TophyIcon from "../icons/trophy";
import LankItem from "./rank-item";

import classes from "./rank-list.module.css";

function RankList(props) {
  const { monthRecords } = props;

  return (
    <ol className={classes.list}>
      <div className={classes.rank}><TophyIcon/> TOP5</div>
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
    </ol>
  );
}

export default RankList;
