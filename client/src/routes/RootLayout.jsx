import { Outlet, redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/rootLayout.module.css";
import { logout } from "../lib/auth";

// logout action
export const action = (queryClient) => async () => {
  try {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["auth"] });
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
