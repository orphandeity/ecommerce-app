import { Link } from "react-router-dom";

function Auth() {
  return (
    <menu
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        listStyle: "none",
      }}
    >
      <li>
        <Link to="login">Login</Link>
      </li>
      <li>
        <Link to="signup">Signup</Link>
      </li>
    </menu>
  );
}

export default Auth;
