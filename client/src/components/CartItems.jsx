import { useQuery } from "@tanstack/react-query";
import { getCartQuery, useRemoveItem } from "../lib/cart";
import { Delete } from "lucide-react";

export default function CartItems() {
  const { data: cart, isLoading, isError } = useQuery(getCartQuery());
  const { mutate: removeItem } = useRemoveItem();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  let isEmpty = cart.items.length == 0;
  if (isEmpty) return <p>Cart is empty</p>;

  let listStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  };

  let itemStyles = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
  };

  return (
    <dl style={listStyles}>
      {cart.items.map((item) => (
        <div key={item.cart_item_id} style={itemStyles}>
          <dt>{item.name}</dt>
          <dd>{item.price_usd}</dd>
          <button onClick={() => removeItem(item.cart_item_id)}>
            <Delete />
          </button>
        </div>
      ))}
    </dl>
  );
}
