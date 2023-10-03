import { useQuery } from "@tanstack/react-query";
import { getCartQuery, useRemoveItem } from "../lib/cart";

function Cart() {
  const { data: cart } = useQuery(getCartQuery());

  const { mutate: removeItem } = useRemoveItem();

  return (
    <div>
      <strong>Cart</strong>
      {cart && cart.items ? (
        <dl
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "50%",
          }}
        >
          {cart.items.map((item) => (
            <div
              key={item.cart_item_id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
              }}
            >
              <dt>{item.name}</dt>
              <dd>{item.price_usd}</dd>
              <button onClick={() => removeItem(item.cart_item_id)}>
                Remove item
              </button>
            </div>
          ))}
        </dl>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
