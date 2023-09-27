import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../styles/rootLayout.module.css";

import Cookies from "js-cookie";

export default function RootLayout() {
  useEffect(() => {
    const cookies = Cookies.get("session");

    if (cookies) console.log("cookies: ", cookies);
    else console.log("no cookies");
  }, []);
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/">
          <strong>E-Commerce App</strong>
        </Link>

        <ul className={styles.auth}>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="signup">Signup</Link>
          </li>
        </ul>
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
      <footer className={styles.footer}>
        <small>created by orphandeity</small>
      </footer>
    </div>
  );
}
