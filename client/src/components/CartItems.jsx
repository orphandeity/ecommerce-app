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
    return items.reduce((sum, item) => sum + Number(item.price_usd), 0);
  }

  return (
    <div>
      <table style={listStyles}>
        <thead>
          <tr style={itemStyles}>
            <th>Item</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody style={{ display: "grid", gap: "1rem" }}>
          {cart.items.map((item) => (
            <tr key={item.cart_item_id} style={itemStyles}>
              <td>{item.name}</td>
              <td>${item.price_usd}</td>
              <td>
                <button onClick={() => removeItem(item.cart_item_id)}>
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={itemStyles}>
            <td>
              <b>Total</b>
            </td>
            <td>${total(cart.items)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// inline styles for demo purposes
let listStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
};

let itemStyles = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  textAlign: "left",
};
