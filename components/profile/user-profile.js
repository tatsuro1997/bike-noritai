import Link from "next/link";

import classes from "./user-profile.module.css";

function UserProfile(props) {
  const { id } = props;

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.card}>
          <h1 className={classes.content}>プロフ</h1>
          <p>{id}さんのプロフ</p>
          <Link href={`/users/${id}/setting`}>
            <a>setting</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
