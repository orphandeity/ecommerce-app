import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Auth from "./Auth";

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
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link to="/cart">
          <ShoppingBag />
        </Link>
        <Auth />
      </div>
    </header>
  );
}
