import RecordItem from "./record-item";
import classes from "./record-list.module.css";

const RecordList = ({ items }) => (
  <ul className={classes.list}>
    {items.length === 0 && <p>まだ記録はありません。</p>}
    {items.length >= 1 &&
      items.map((record) =>
        <RecordItem
          key={record._id}
          record={record}
        />
      )
    }
  </ul>
);

export default RecordList;
