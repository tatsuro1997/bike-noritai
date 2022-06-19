import RecordItem from "./record-item";
import classes from "./record-list.module.css";

function RecordList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.length === 0 && <p>まだ記録はありません。</p>}
      {items.length >= 1 &&
        items.map((record) => (
          <RecordItem
            key={record._id}
            id={record._id}
            date={record.date}
            weather={record.weather}
            temperature={record.temperature}
            running_time={record.running_time}
            distance={record.distance}
            description={record.description}
            spotId={record.spotId}
            // image={record.image}
          />
        ))}
    </ul>
  );
}

export default RecordList;
