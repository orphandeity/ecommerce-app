import {
  Form,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { login } from "../lib/auth";
import GoogleLogin from "../components/GoogleLogin";

export const action =
  (queryClient) =>
  async ({ request }) => {
    try {
      let formData = await request.formData();
      let credentials = Object.fromEntries(formData);
      let response = await login(credentials);
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      if (response.status == 200) return redirect("/");
      else return { error: response.statusText };
    } catch (err) {
      console.error(err);
    }

    return { error: "Unknown error" };
  };

export default function Login() {
  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "4rem",
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <h1>Login</h1>
        <Form method="post" replace style={formStyles}>
          <label>Username</label>
          <input name="username" type="text" min={3} max={20} required />
          <label>Password</label>
          <input name="password" type="password" pattern="\w{8, 20}" required />
          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Log in"}
          </button>
          {actionData && actionData.error ? (
            <p style={{ color: "red" }}>{actionData.error}</p>
          ) : null}
        </Form>
        <GoogleLogin />
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
