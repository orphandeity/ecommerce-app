import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "../lib/cart";
import { ShoppingBag } from "lucide-react";

function Cart() {
  const { data: cart } = useQuery(getCartQuery());

  if (!cart) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <ShoppingBag />
      {cart && cart.items ? (
        <dl
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {cart.items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "1rem" }}>
              <dt>{item.name}</dt>
              <dd>{item.price_usd}</dd>
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
