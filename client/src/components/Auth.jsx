import { Link, Form } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../lib/auth";

function Auth() {
  const { data } = useQuery(authQuery());
  const loggedIn = data?.isAuthenticated;

  if (loggedIn) {
    return (
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
    );
  } else {
    return (
      <menu
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
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
}

export default Auth;
