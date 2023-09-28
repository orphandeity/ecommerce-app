import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import axios from "axios";

export const action =
  (queryClient) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const credentials = Object.fromEntries(formData);
      const response = await axios.post("/api/auth/register", credentials);
      if (response.status !== 200) {
        return { error: response.statusText };
      } else {
        await queryClient.invalidateQueries("isAuthenticated");
        return redirect("/");
      }
    } catch (err) {
      console.error(err);
    }
    return { error: "Unknown error" };
  };

export default function Signup() {
  let navigation = useNavigation();
  let isSigningUp = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <Form
        method="post"
        replace
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
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
    </div>
  );
}
