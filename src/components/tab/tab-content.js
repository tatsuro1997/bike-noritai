import TabHeader from "./tab-header";
import classes from "./tab-content.module.css";

const TabCard = ({ user }) => (
  <div className={classes.wrapper}>
    <TabHeader user={user} />
  </div>
);

export default TabCard;
