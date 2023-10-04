import { authQuery } from "../lib/auth";
import { checkout } from "../lib/cart";
import CartItems from "../components/CartItems";
import { Form, redirect } from "react-router-dom";

export const loader = (queryClient) => async () => {
  let isLoggedIn = await queryClient.ensureQueryData(authQuery());
  if (!isLoggedIn) return redirect("/login");
  return isLoggedIn;
};

export const action = async () => {
  await checkout();
  return redirect("/orders");
};

function Checkout() {
  return (
    <div style={{ display: "grid", gap: "4rem" }}>
      <h1>Checkout Page</h1>
      <CartItems />
      <Form method="post" replace>
        <button type="submit" style={{ width: "100%" }}>
          Checkout
        </button>
      </Form>
    </div>
  );
}

export default Checkout;
