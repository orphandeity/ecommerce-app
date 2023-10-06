import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import CartItems from "./CartItems";
import CartIcon from "./CartIcon";

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
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: "var(--padding)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "2rem",
};

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
        <Dialog.Overlay style={overlayStyles} />
        <Dialog.Content style={contentStyles} aria-describedby={undefined}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Dialog.Title>Cart</Dialog.Title>
            <Dialog.Close>
              <X />
            </Dialog.Close>
          </header>
          <CartItems />
          <Link to="/checkout" onClick={() => setOpen(false)}>
            View cart
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Cart;
