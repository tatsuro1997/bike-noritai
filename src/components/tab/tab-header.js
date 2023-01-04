import Image from "next/image";
import Link from "next/link";
import EditIcon from "../icons/edit-icon";
import TabList from "./tab-list";
import classes from "./tab-header.module.css";

const TabHeader = ({ user }) => {
  const humanReadableDate = new Date(user.created_at).toLocaleDateString(
    "ko-KR",
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className={classes.card}>
      <div className={classes.profileHeader}>
        <div className={classes.profileHeader_header}>
          <p className={classes.created_at}>{humanReadableDate}登録</p>
          <div className={classes.setting}>
            <div className={classes.icon}>
              <EditIcon />
            </div>
            <Link href={`/users/${user.uid}/setting`}>
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
          />
          <div className={classes.name}>{user.name}</div>
        </div>
      </div>
      <hr />
      <TabList user={user} />
    </div>
  );
}

export default TabHeader;
