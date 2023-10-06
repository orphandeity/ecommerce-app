import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesQuery } from "../lib/product";
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
  const { data: categories } = useQuery(getAllCategoriesQuery());

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        style={{
          backgroundColor: "var(--background-color)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <MenuIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content style={contentStyles}>
          <DropdownMenu.Item>
            <Link to="/">All products</Link>
          </DropdownMenu.Item>

          {categories?.map((category) => (
            <DropdownMenu.Item key={category.id}>
              <Link to={`/?categoryId=${category.id}`}>{category.name}</Link>
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator style={separatorStyles} />

          <DropdownMenu.Item>
            <Link to="/checkout">View cart</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link to="/orders">Past orders</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Menu;
