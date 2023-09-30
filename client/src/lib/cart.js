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

export const getCartQuery = () => ({
  queryKey: ["cart"],
  queryFn: getCart,
});
