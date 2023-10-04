import { authQuery } from "../lib/auth";
import CartItems from "../components/CartItems";
import { redirect } from "react-router-dom";

export const loader = (queryClient) => async () => {
  let isLoggedIn = await queryClient.ensureQueryData(authQuery());
  if (!isLoggedIn) return redirect("/login");
  return isLoggedIn;
};

function Checkout() {
  return (
    <div style={{ display: "grid", gap: "4rem" }}>
      <h1>Checkout Page</h1>
      <CartItems />
      <form action="/api/cart/create-checkout-session" method="post">
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
}

export default Checkout;
