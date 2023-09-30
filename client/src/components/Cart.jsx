import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "../lib/cart";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { data: cart } = useQuery(getCartQuery());

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
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>{item.product_id}</li>
          ))}
        </ul>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
