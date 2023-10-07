import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCartQuery, useRemoveItem } from "../lib/cart";
import { Delete } from "lucide-react";

export default function CartItems() {
  const { data: cart, isLoading, isError } = useQuery(getCartQuery());
  const { mutate: removeItem } = useRemoveItem();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  let isEmpty = cart && cart.items.length == 0;
  if (isEmpty) return <p>Cart is empty</p>;

  function total(items) {
    return items
      .reduce((sum, item) => sum + Number(item.price_usd), 0)
      .toFixed(2);
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <ul style={listStyles}>
        {cart.items.map((item) => (
          <li key={item.cart_item_id} style={itemStyles}>
            <Link to={`/products/${item.product_id}`}>{item.name}</Link>
            <div>${item.price_usd}</div>
            <div>
              <button
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "red",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => removeItem(item.cart_item_id)}
              >
                <Delete />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <div style={{ textAlign: "right" }}>
        <b>Subtotal: ${total(cart.items)}</b>
      </div>
    </div>
  );
}

// inline styles for demo purposes
let listStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--padding)",
  width: "100%",
};

let itemStyles = {
  display: "grid",
  gridTemplateColumns: "2fr auto auto",
  gap: "var(--padding)",
};
