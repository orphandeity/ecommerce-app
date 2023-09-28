import { Form, useNavigation, useActionData } from "react-router-dom";
import { login } from "../lib/auth";

export const action =
  (queryClient) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const credentials = Object.fromEntries(formData);
      const user = await login(credentials);
      await queryClient.invalidateQueries("isAuthenticated");
      return user;
    } catch (err) {
      console.error(err);
    }

    return { error: "Unknown error" };
  };

export default function Login() {
  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <Form
        method="post"
        replace
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <h1>Login</h1>
        <label>
          Username: <input name="username" type="text" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Log in"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
}
