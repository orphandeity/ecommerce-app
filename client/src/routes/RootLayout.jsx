import { Outlet, redirect } from "react-router-dom";
import { logout } from "../lib/auth";

import styles from "../styles/rootLayout.module.css";
import Header from "../components/Header";

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
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>

      <footer className={styles.footer}>
        <small>created by orphandeity</small>
      </footer>
    </div>
  );
}
