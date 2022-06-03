import classes from "./user-profile.module.css";

function UserProfile(props) {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.card}>
          <h1 className={classes.content}>プロフ</h1>
          <p>{props.id}さんのプロフ</p>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
