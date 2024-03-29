import Image from "next/image";
import Link from "next/link";
import EditIcon from "../icons/edit-icon";
import classes from "./profile-header.module.css";
import Report from "./report";

const ProfileHeader = ({ props, thisMonthRecords }) => {
  const { id, name, area, prefecture, experience, bike_name, url, created_at } =
    props;

  return (
    <div className={classes.card}>
      <div className={classes.profileHeader}>
        <div className={classes.profileHeader_header}>
          <p className={classes.created_at}>{created_at}登録</p>
          <div className={classes.setting}>
            <div className={classes.icon}>
              <EditIcon />
            </div>
            <Link href={`/users/${id}/setting`}>
              <a>設定</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.profileHeader_content}>
        <div className={classes.profileHeader_content_left}>
          <Image
            src={"/images/no_image.webp"}
            alt={"プロフィール画像"}
            width={100}
            height={100}
            priority
          />
          <div className={classes.name}>{name}</div>
        </div>
        <Report thisMonthRecords={thisMonthRecords} uid={id} />
      </div>
      <ul className={classes.profileInfo}>
        <li>
          <span className={classes.key}>主なツーリングエリア</span>
          <span className={classes.value}>{area}</span>
        </li>
        <li>
          <span className={classes.key}>都道府県</span>
          <span className={classes.value}>{prefecture}</span>
        </li>
        <li>
          <span className={classes.key}>バイク歴</span>
          <span className={classes.value}>{experience}年</span>
        </li>
        <li>
          <span className={classes.key}>車種</span>
          <span className={classes.value}>{bike_name}</span>
        </li>
        <li>
          <span className={classes.key}>URL</span>
          {url && (
            <Link href={url}>
              <a target="_blank" rel="noopener noreferrer">
                <span className={classes.value}>{url}</span>
              </a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ProfileHeader;
