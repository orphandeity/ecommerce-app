import {
  Form,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { register } from "../lib/auth";

export const action =
  (queryClient) =>
  async ({ request }) => {
    try {
      let formData = await request.formData();
      let credentials = Object.fromEntries(formData);
      let response = await register(credentials);
      if (response.status != 200) return { error: response.statusText };
      queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
      return redirect("/");
    } catch (err) {
      console.error(err);
    }
    return { error: "Unknown error" };
  };

export default function Signup() {
  let navigation = useNavigation();
  let isSigningUp = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "4rem",
  };

  return (
    <div
      style={{ display: "grid", placeItems: "center", gap: "var(--padding)" }}
    >
      <Form method="post" replace style={formStyles}>
        <h1>Sign up</h1>
        <label>
          Username: <input name="username" type="text" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <button type="submit" disabled={isSigningUp}>
          {isSigningUp ? "Signing up..." : "Sign up"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
