import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../lib/auth";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import Cart from "./Cart";

let headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "var(--padding)",
};

let authStyles = { display: "flex", alignItems: "center", gap: "2rem" };

export default function Header() {
  const { data: isLoggedIn } = useQuery(authQuery());

  return (
    <header style={headerStyles}>
      <Link to="/">
        <strong>E-Commerce App</strong>
      </Link>
      <div style={authStyles}>
        <Auth />
      </div>
      {isLoggedIn && <Cart />}
    </header>
  );
}
