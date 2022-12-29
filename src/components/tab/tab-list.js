import TabItem from "./tab-item";
import classes from "./tab-list.module.css";

const TabList = ({ user }) => (
  <ul className={classes.ul}>
    <TabItem user={user} />
  </ul>
);

export default TabList;
