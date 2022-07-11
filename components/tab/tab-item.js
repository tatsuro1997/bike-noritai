import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./tab-item.module.css"

function TabItem({ user }) {
  const router = useRouter();

  const splitPath = router.pathname.split("/")
  const lastPath = splitPath.slice(-1)[0]

  let selectStyle;
  let selectStyleReport;

  if (lastPath === "[userId]"){
    selectStyle = classes.select_tab
  }

  if (lastPath === "report") {
    selectStyleReport = classes.select_tab;
  }

  return (
    <>
      <li className={`${classes.li} ${selectStyle}`}>
        <Link href={`/users/${user.uid}`}>
          <a>ツー</a>
        </Link>
      </li>
      <li className={`${classes.li} ${selectStyleReport}`}>
        <Link href={`/users/${user.uid}/report`}>
          <a>レポート</a>
        </Link>
      </li>
      <li className={classes.li}>
        <Link href="#">
          <a>イキタイ</a>
        </Link>
      </li>
      <li className={classes.li}>
        <Link href="#">
          <a>登録スポ</a>
        </Link>
      </li>
    </>
  );
}

export default TabItem
