import { Outlet } from "react-router-dom";
import styles from "../styles/rootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <strong>E-Commerce App</strong>
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
