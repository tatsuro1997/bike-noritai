import TophyIcon from "../icons/trophy";
import LankItem from "./rank-item";

import classes from "./rank-list.module.css";

function RankList(props) {
  const { monthRecords } = props;

  const sortedMonthRecord = monthRecords.sort((a, b) => b.distance - a.distance);

    return (
      <ol className={classes.list}>
        <div className={classes.rank}>
          <TophyIcon /> TOP5
        </div>
        {sortedMonthRecord.length === 0 && <p> - </p>}
        {sortedMonthRecord.length >= 1 &&
          sortedMonthRecord.map((record) => (
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
