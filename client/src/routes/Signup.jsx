import {
  Form,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { register } from "../lib/auth";

import styles from "../styles/auth.module.css";

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Sign up</h1>
        <Form method="post" replace className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label>Username</label>
              <input name="username" type="text" />
            </div>
            <div className={styles.input}>
              <label>Password:</label>
              <input name="password" type="password" />
            </div>
          </div>
          <button type="submit" disabled={isSigningUp}>
            {isSigningUp ? "Signing up..." : "Sign up"}
          </button>
        </Form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      {actionData && actionData.error ? (
        <p className={styles.error}>{actionData.error}</p>
      ) : null}
    </div>
  );
}
