import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, loading } = useSession();

  function logoutHandler() {
    signOut();
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
        <nav>
          <ul>
            {!session && !loading && (
              <li>
                <Link href="/auth">Login</Link>
              </li>
            )}
            {!session && (
              <li>
                <Link href="/spots">スポット一覧</Link>
              </li>
            )}

            {session && exploreLink && (
              <li>
                <Link href={exploreLink}>{session.user.email}</Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/users">ユーザー一覧</Link>
              </li>
            )}
            {session && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
