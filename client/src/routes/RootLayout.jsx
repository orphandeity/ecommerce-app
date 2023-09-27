import { useEffect } from "react";
import { Outlet } from "react-router-dom";
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
        <strong>E-Commerce App</strong>
        <ul className={styles.auth}>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
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
