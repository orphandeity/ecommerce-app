import { Link, Form } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../lib/auth";

import styles from "../styles/header.module.css";

export default function Header() {
  const { data } = useQuery(authQuery());
  const isLoggedIn = data?.isAuthenticated;

  return (
    <header className={styles.header}>
      <Link to="/">
        <strong>E-Commerce App</strong>
      </Link>

      {isLoggedIn && <p>Hello!</p>}

      <ul className={styles.auth}>
        {isLoggedIn ? (
          <li>
            <Form method="post">
              <button type="submit">Logout</button>
            </Form>
          </li>
        ) : (
          <>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
