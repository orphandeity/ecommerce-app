import { Form, Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu as MenuIcon } from "lucide-react";

let contentStyles = {
  minWidth: "220px",
  borderRadius: "var(--border-radius)",
  padding: "var(--padding)",
  backgroundColor: "var(--background-secondary-color",
  boxShadow: "var(--shadow)",
  display: "grid",
  gap: "1rem",
};

let separatorStyles = {
  height: "1px",
  backgroundColor: "var(--border-color)",
  margin: "var(--padding) 0",
};

function Menu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <MenuIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content style={contentStyles}>
          <DropdownMenu.Item>
            <Link to="/">All products</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator style={separatorStyles} />
          <DropdownMenu.Item>Dresses</DropdownMenu.Item>
          <DropdownMenu.Item>Outerwear</DropdownMenu.Item>
          <DropdownMenu.Item>Suits & Formalwear</DropdownMenu.Item>
          <DropdownMenu.Item>Handbags & Accessories</DropdownMenu.Item>
          <DropdownMenu.Item>Eyewear</DropdownMenu.Item>
          <DropdownMenu.Item>Scarves & Jewelry</DropdownMenu.Item>
          <DropdownMenu.Item>Footwear</DropdownMenu.Item>

          <DropdownMenu.Separator style={separatorStyles} />
          <DropdownMenu.Item>
            <Link to="/checkout">View cart</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link to="/orders">Past orders</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator style={separatorStyles} />
          <DropdownMenu.Item>
            <Form method="post">
              <button type="submit" style={{ width: "100%" }}>
                Logout
              </button>
            </Form>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Menu;
