import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import { login } from "../lib/auth";

export const action =
  (queryClient) =>
  async ({ request }) => {
    try {
      let formData = await request.formData();
      let credentials = Object.fromEntries(formData);
      let response = await login(credentials);
      queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
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
  console.log(actionData);

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
