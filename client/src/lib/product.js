import axios from "axios";

async function getProducts() {
  try {
    let response = await axios("/api/products");
    let products = response.data;
    return products;
  } catch (err) {
    console.error(err);
  }
}

export const getAllProductsQuery = () => ({
  queryKey: ["products", "all"],
  queryFn: getProducts,
});
