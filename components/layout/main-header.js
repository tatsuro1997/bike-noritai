import Link from "next/link";

import classes from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">バイクノリタイ</Link>
      </div>
      <div className={classes.navigations}>
        <nav className={classes.navigation}>
          <ul>
            <li>
              <Link href="/spots">スポット一覧</Link>
            </li>
          </ul>
        </nav>
        <nav className={classes.navigation}>
          <ul>
            <li>
              <Link href="/users">ユーザー一覧</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainHeader;
