import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "../lib/cart";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { data: cart } = useQuery(getCartQuery());

  if (cart && cart.items) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ShoppingCart />
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default Cart;
