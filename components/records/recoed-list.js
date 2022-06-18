import RecordItem from "./record-item";
import classes from "./record-list.module.css";

function RecordList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((record) => (
        <RecordItem
          key={record._id}
          id={record._id}
          date={record.date}
          // type={record.type}
          // prefecture={record.prefecture}
          // address1={record.address1}
          // open_time={record.open_time}
          // image={record.image}
        />
      ))}
    </ul>
  );
}

export default RecordList;
