import { redirect, useLoaderData } from "react-router-dom";
import { authQuery } from "../lib/auth";
import { getCartQuery } from "../lib/cart";
import CartItems from "../components/CartItems";

export const loader = (queryClient) => async () => {
  let isLoggedIn = await queryClient.ensureQueryData(authQuery());
  if (!isLoggedIn) return redirect("/login");

  const cart = await queryClient.ensureQueryData(getCartQuery());

  return cart;
};

function Checkout() {
  const cart = useLoaderData();
  let isEmpty = cart.items.length == 0;

  return (
    <div style={{ display: "grid", gap: "4rem" }}>
      <h1>Shopping Cart</h1>
      <CartItems />

      <form action="/api/cart/create-checkout-session" method="post">
        <button type="submit" disabled={isEmpty}>
          Checkout
        </button>
      </form>
    </div>
  );
}

export default Checkout;
