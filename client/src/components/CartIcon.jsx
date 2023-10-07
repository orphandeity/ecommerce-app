import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "../lib/cart";
import { ShoppingBag } from "lucide-react";

import styles from "../styles/cart.module.css";

function CartIcon() {
  let { data: cart } = useQuery(getCartQuery());

  return (
    <div className={styles.wrapper}>
      <ShoppingBag />
      {cart && cart.items.length > 0 && <div className={styles.badge} />}
    </div>
  );
}

export default CartIcon;
