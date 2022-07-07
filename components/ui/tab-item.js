import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./tab-item.module.css"

function TabItem({ user }) {
  console.log(user);
  const router = useRouter();
  console.log(router.path);
  console.log(router.pathname);

  const splitPath = router.pathname.split("/")
  console.log(splitPath);
  const lastPath = splitPath.slice(-1)[0]
  console.log(lastPath);

  if (lastPath === "[userId]"){
     console.log("true");
   }

  return (
    <>
      <li className={classes.li}>
        <Link href={`/users/${user._id}`}>
          <a>ツー</a>
        </Link>
      </li>
      <li className={classes.li}>
        <Link href={`/users/${user.uid}/report`}>
          <a>レポート</a>
        </Link>
      </li>
      <li className={classes.li}>
        <Link href="">
          <a>イキタイ</a>
        </Link>
      </li>
      <li className={classes.li}>
        <Link href="">
          <a>登録スポ</a>
        </Link>
      </li>
    </>
  );
}

export default TabItem
