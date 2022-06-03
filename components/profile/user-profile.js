import Link from "next/link";

import classes from "./user-profile.module.css";

function UserProfile(props) {
  const { id, area, prefecture, experience, bike_name, url } = props;

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.card}>
          <h1 className={classes.content}>プロフ</h1>
          <p>{id}さんのプロフ</p>
          <p>{area}</p>
          <p>{prefecture}</p>
          <p>{experience}</p>
          <p>{bike_name}</p>
          {url && <Link href={url}>
            <a target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </Link>}
          <Link href={`/users/${id}/setting`}>
            <a>setting</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
