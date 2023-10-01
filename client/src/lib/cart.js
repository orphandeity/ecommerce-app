import axios from "axios";

async function getCart() {
  try {
    let response = await axios.get("/api/cart");
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getCartItems() {
  try {
    let response = await axios.get("/api/cart/items");
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function addToCart(productId) {
  try {
    let response = await axios.post("/api/cart/items", { productId });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function removeFromCart(productId) {
  try {
    let response = await axios.delete(`/api/cart/items/${productId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const getCartQuery = () => ({
  queryKey: ["cart"],
  queryFn: getCart,
});

export const getCartItemsQuery = () => ({
  queryKey: ["cart", "items"],
  queryFn: getCartItems,
});
