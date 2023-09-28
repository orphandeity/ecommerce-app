import { Outlet, Link, Form } from "react-router-dom";
import axios from "axios";

import styles from "../styles/rootLayout.module.css";

export const action = async () => {
  try {
    const response = await axios.post("/api/auth/logout");
    if (response.status !== 200) {
      return { error: response.statusText };
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

export default function RootLayout() {
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
            <Form method="post">
              <button type="submit">Logout</button>
            </Form>
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
