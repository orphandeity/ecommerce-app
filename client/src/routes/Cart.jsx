import { useLoaderData } from "react-router-dom";
import { getCartQuery } from "../lib/cart";
import CartItems from "../components/CartItems";

export const loader = (queryClient) => () => {
  return queryClient.ensureQueryData(getCartQuery());
};

function Cart() {
  const cart = useLoaderData();

  return (
    <>
      <h1>Cart</h1>
      {cart && cart.items ? (
        <CartItems products={cart.items} />
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
}

export default Cart;
