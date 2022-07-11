import TabHeader from "./tab-header";
import TabList from "./tab-list";
import classes from "./tab-content.module.css"

function TabCard({user}) {
  return (
    <div className={classes.wrapper}>
      <TabHeader user={user} />
    </div>
  );
}

export default TabCard;
