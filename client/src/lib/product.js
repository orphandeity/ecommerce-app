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

async function getProductsByCategoryId(id) {
  try {
    let response = await axios(`/api/products?categoryId=${id}`);
    let products = response.data;
    return products;
  } catch (err) {
    console.error(err);
  }
}

async function getCategories() {
  try {
    let response = await axios("/api/products/categories");
    let categories = response.data;
    return categories;
  } catch (err) {
    console.error(err);
  }
}

export const getAllProductsQuery = () => ({
  queryKey: ["products"],
  queryFn: getProducts,
});

export const getProductByIdQuery = (id) => ({
  queryKey: ["products", { productId: id }],
  queryFn: () => getProductById(id),
});

export const getProductsByCategoryIdQuery = (id) => ({
  queryKey: ["products", { categoryId: id }],
  queryFn: () => getProductsByCategoryId(id),
});

export const getAllCategoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: getCategories,
});
