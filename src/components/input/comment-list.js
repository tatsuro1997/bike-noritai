import classes from "./comment-list.module.css";

const CommentList = ({ items }) => (
  <ul className={classes.comments}>
    {items &&
      items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            <address>By {item.name}</address>
          </div>
        </li>
      ))}
    {items.length === 0 && <p>まだコメントがありません。</p>}
  </ul>
);

export default CommentList;
