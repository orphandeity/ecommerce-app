import { Link } from "react-router-dom";
import Auth from "./Auth";
import Cart from "./Cart";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "var(--padding)",
      }}
    >
      <Link to="/">
        <strong>E-Commerce App</strong>
      </Link>
      <Cart />
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Auth />
      </div>
    </header>
  );
}
