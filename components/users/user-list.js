import UserItem from "./user-item";
import classes from "./user-list.module.css";

function UserList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          email={user.email}
          // image={user.image}
        />
      ))}
    </ul>
  );
}

export default UserList;
