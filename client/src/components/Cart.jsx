import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingBag, X } from "lucide-react";
import CartItems from "./CartItems";

let overlayStyles = {
  backgroundColor: "var(--overlay-color)",
  position: "fixed",
  inset: 0,
};

let contentStyles = {
  backgroundColor: "var(--background-color)",
  borderRadius: "var(--border-radius)",
  boxShadow: "var(--shadow)",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  maxWidth: "400px",
  maxHeight: "85vh",
  padding: "var(--padding)",
};

function Cart() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <ShoppingBag />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay style={overlayStyles} />
        <Dialog.Content style={contentStyles} aria-describedby={undefined}>
          <Dialog.Title>Cart</Dialog.Title>
          <CartItems />
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Cart;
