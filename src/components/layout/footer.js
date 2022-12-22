import Link from "next/link";

import classes from "./footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.sitemap}>
        <div className={classes.content}>
          <ul className={classes.links}>
            <p>取り組み</p>
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
        </div>
        <div className={classes.foot}>
          <div className={classes.logo}>
            <Link href="/">バイクノリタイ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
