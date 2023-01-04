import UserItem from "./user-item";
import classes from "./user-list.module.css";

const UserList = ({ items }) => (
  <ul className={classes.list}>
    {items.map((user) => (
      <UserItem
        key={user._id}
        id={user.uid}
        email={user.email}
      // image={user.image}
      />
    ))}
  </ul>
);

export default UserList;
