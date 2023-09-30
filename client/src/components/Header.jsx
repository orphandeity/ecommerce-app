import { Link } from "react-router-dom";
import Auth from "./Auth";

import styles from "../styles/header.module.css";
import Cart from "./Cart";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <strong>E-Commerce App</strong>
      </Link>
      <Cart />
      <Auth />
    </header>
  );
}
