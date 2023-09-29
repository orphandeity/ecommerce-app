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

async function getProductById(id) {
  try {
    let response = await axios(`/api/products/${id}`);
    let product = response.data;
    return product;
  } catch (err) {
    console.error(err);
  }
}

export const getProductByIdQuery = (id) => ({
  queryKey: ["products", id],
  queryFn: () => getProductById(id),
});

export const getAllProductsQuery = () => ({
  queryKey: ["products", "all"],
  queryFn: getProducts,
});
