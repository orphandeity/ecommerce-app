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

async function createCart() {
  try {
    let response = await axios.post("/api/cart");
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function addToCart() {
  try {
    let response = await axios.post("/api/cart/items");
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const getCartQuery = () => ({
  queryKey: ["cart"],
  queryFn: getCart,
});

export const createCartMutation = () => ({
  mutationKey: ["cart"],
  mutationFn: createCart,
  invalidateQueryKeys: ["cart"],
});

export const addToCartMutation = () => ({
  mutationKey: ["cart", "items"],
  mutationFn: addToCart,
  invalidateQueryKeys: ["cart"],
});
