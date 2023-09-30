import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "../lib/cart";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { data: cart } = useQuery(getCartQuery());

  console.log(cart);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ShoppingCart />
      {cart && cart.items ? (
        <dl>
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
