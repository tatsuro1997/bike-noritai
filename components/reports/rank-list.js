import TrophyIcon from "../icons/trophy";
import LankItem from "./rank-item";

import classes from "./rank-list.module.css";

function RankList(props) {
  const { monthRecords } = props;

  const sortedMonthRecord = monthRecords.sort((a, b) => b.distance - a.distance);
  const slicedMonthRecord = sortedMonthRecord.slice(0, 5);

    return (
      <ol className={classes.list}>
        <div className={classes.rank}>
          <TrophyIcon /> TOP5
        </div>
        {slicedMonthRecord.length === 0 && <p> - </p>}
        {slicedMonthRecord.length >= 1 &&
          slicedMonthRecord.map((record) => (
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
