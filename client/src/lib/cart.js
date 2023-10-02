import axios from "axios";

async function cart() {
  try {
    let response = await axios.get("/api/cart");
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getCartQuery = () => ({
  queryKey: ["cart"],
  queryFn: cart,
});

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
