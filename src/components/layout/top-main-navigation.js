import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

import classes from "./top-main-navigation.module.css";

function TopMainNavigation() {
  const { data: session, loading } = useSession();
  const [isShowMenu, setIsShowMenu] = useState(false);

  function logoutHandler() {
    signOut();
  }

  function nemuToggleHandler() {
    setIsShowMenu((prevState) => !prevState);
  }

  let exploreLink;

  if (session) {
    const userId = JSON.stringify(session.user.id);
    exploreLink = `/users/${userId}`;
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">バイクノリタイ</Link>
      </div>
      <div className={classes.navigations}>
        <nav className={classes.navigation}>
          {session && (
            <Image
              src={"/images/no_image.webp"}
              alt={"プロフィール画像"}
              width={30}
              height={30}
              onClick={nemuToggleHandler}
            />
          )}
          {!session && !loading && (
            <Link href="/auth">
              <a>ログイン</a>
            </Link>
          )}
        </nav>
      </div>
      {isShowMenu && session && (
        <div className={classes.menu_content} onClick={nemuToggleHandler}>
          <div className={classes.menu_nav}>
            <ul className={classes.profile}>
              {session && exploreLink && (
                <li>
                  <Link href={exploreLink}>
                    <a>{session.user.name}</a>
                  </Link>
                  <span>マイページを表示</span>
                </li>
              )}
            </ul>
            <ul className={classes.links}>
              <li>
                <Link href="/spots">
                  <a>スポット一覧</a>
                </Link>
              </li>
              <li>
                <Link href="/users">
                  <a>ユーザー一覧</a>
                </Link>
              </li>
            </ul>
            <ul className={classes.logout}>
              <li>
                <a onClick={logoutHandler}>ログアウト</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default TopMainNavigation;
