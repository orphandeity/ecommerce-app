import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import CartIcon from "./CartIcon";

import styles from "../styles/cart.module.css";

function Cart() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        style={{
          backgroundColor: "var(--background-color)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <CartIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-describedby={undefined}>
          <CartItems />
          <div className={styles.options}>
            <Dialog.Close>cancel</Dialog.Close>
            <Link to="/checkout" onClick={() => setOpen(false)}>
              Go to cart
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Cart;
