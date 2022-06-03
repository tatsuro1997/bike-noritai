import Image from "next/image";
import Link from "next/link";

import classes from "./user-profile.module.css";

function UserProfile(props) {
  const { id, name, area, prefecture, experience, bike_name, url, created_at } = props;

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.card}>
          <div className={classes.profileHeader}>
            <div className={classes.profileHeader_header}>
              <p>{created_at}登録</p>
              <Link href={`/users/${id}/setting`}>
                <a>setting</a>
              </Link>
            </div>
          </div>
          <div className={classes.profileHeader_content}>
            <div className={classes.image}>
              <Image
                src={"/images/no_image.webp"}
                alt={"プロフィール画像"}
                width={320}
                height={200}
              />
            </div>
            <p>{name}さんのプロフ</p>
          </div>
          <div className={classes.profileInfo}>
            <p>主なツーリングエリア：{area}</p>
            <p>都道府県：{prefecture}</p>
            <p>バイク歴：{experience}</p>
            <p>車種：{bike_name}</p>
            {url && (
              <Link href={url}>
                <a target="_blank" rel="noopener noreferrer">
                  URL：{url}
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
