import ProfileHeader from "./profile-header";
import classes from "./user-profile.module.css";

const UserProfile = (props) => (
  <div className={classes.wrapper}>
    <ProfileHeader props={props} thisMonthRecords={props.thisMonthRecords} />
  </div>
);

export default UserProfile;
