import { Outlet, Link, Form, useLoaderData, redirect } from "react-router-dom";

import styles from "../styles/rootLayout.module.css";
import { authQuery, logout } from "../lib/auth";
import { useState } from "react";

export const loader = (queryClient) => () => {
  const query = authQuery();
  return queryClient.ensureQueryData(query);
};

// logout action
export const action = (queryClient) => async () => {
  try {
    const response = await logout();
    if (response.status == 200) {
      await queryClient.invalidateQueries("isAuthenticated");
      return redirect("/");
    } else {
      return { error: response.statusText };
    }
  } catch (err) {
    console.error(err);
  }
};

export default function RootLayout() {
  const { isAuthenticated } = useLoaderData();
  const [isLoggedIn, setisLoggedIn] = useState(isAuthenticated);

  return (
    <div className={styles.layout}>
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

      <div className={styles.content}>
        <Outlet />
      </div>

      <footer className={styles.footer}>
        <small>created by orphandeity</small>
      </footer>
    </div>
  );
}
