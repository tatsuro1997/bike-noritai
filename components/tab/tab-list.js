import TabItem from "./tab-item"

import classes from "./tab-list.module.css"

function TabList({user}) {
  return (
    <ul className={classes.ul}>
      <TabItem user={user} />
    </ul>
  )
}

export default TabList
