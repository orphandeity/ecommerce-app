import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import axios from "axios";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    const response = await axios.post("/api/auth/login", credentials);
    if (response.status !== 200) {
      return { error: response.statusText };
    }
  } catch (err) {
    console.error(err);
  }

  return redirect("/");
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
