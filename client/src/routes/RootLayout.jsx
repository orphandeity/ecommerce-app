import { Outlet, redirect } from "react-router-dom";
import { logout } from "../lib/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
