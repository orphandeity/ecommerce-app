import {
  Form,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { login } from "../lib/auth";
import GoogleLogin from "../components/GoogleLogin";

import styles from "../styles/auth.module.css";

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Login</h1>
        <Form method="post" replace className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label>Username</label>
              <input name="username" type="text" min={3} max={20} required />
            </div>
            <div className={styles.input}>
              <label>Password</label>
              <input
                name="password"
                type="password"
                pattern="\w{8, 20}"
                required
              />
            </div>
          </div>
          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Log in"}
          </button>
        </Form>

        <p>- or -</p>

        <GoogleLogin />

        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      {actionData && actionData.error ? (
        <p className={styles.error}>{actionData.error}</p>
      ) : null}
    </div>
  );
}
