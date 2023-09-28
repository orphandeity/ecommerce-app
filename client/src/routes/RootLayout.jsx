import { Outlet, Link, Form, redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authQuery, logout } from "../lib/auth";

import styles from "../styles/rootLayout.module.css";

// logout action
export const action = (queryClient) => async () => {
  try {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
    return redirect("/");
  } catch (err) {
    console.error(err);
  }
  return { error: "Unknown error" };
};

export default function RootLayout() {
  const { data } = useQuery(authQuery());
  const isLoggedIn = data?.isAuthenticated;

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
