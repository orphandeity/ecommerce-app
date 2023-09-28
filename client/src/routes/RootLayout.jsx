import { Outlet, Link, useLoaderData } from "react-router-dom";
import axios from "axios";

import styles from "../styles/rootLayout.module.css";

const userQuery = () => ({
  queryKey: ["user"],
  queryFn: () => axios("/api/user").then((res) => res.data),
});

export const loader = (queryClient) => async () => {
  const query = userQuery();
  return queryClient.ensureQueryData(query);
};

export default function RootLayout() {
  const user = useLoaderData();
  console.log("root layout user: ", user);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/">
          <strong>E-Commerce App</strong>
        </Link>

        <p>Hello, {user.username}!</p>

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
