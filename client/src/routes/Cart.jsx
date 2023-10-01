import { useLoaderData } from "react-router-dom";
import { getCartQuery } from "../lib/cart";

export const loader = (queryClient) => () => {
  return queryClient.ensureQueryData(getCartQuery());
};

function Cart() {
  const cart = useLoaderData();

  return (
    <>
      <h1>Cart</h1>
      {cart && cart.items ? (
        <dl
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          {cart.items.map((item) => (
            <div
              key={item.id}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <dt>{item.name}</dt>
              <dd>{item.price_usd}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
}

export default Cart;
