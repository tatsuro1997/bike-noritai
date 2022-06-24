import ProfileHeader from "./profile-header";

import classes from "./user-profile.module.css";

function UserProfile(props) {
  const {
    id,
    name,
    area,
    prefecture,
    experience,
    bike_name,
    url,
    created_at,
    thisMonthRecords,
  } = props;

  return (
    <div className={classes.wrapper}>
      <ProfileHeader
        id={id}
        name={name}
        area={area}
        prefecture={prefecture}
        experience={experience}
        bike_name={bike_name}
        url={url}
        created_at={created_at}
        thisMonthRecords={thisMonthRecords}
      />
    </div>
  );
}

export default UserProfile;
