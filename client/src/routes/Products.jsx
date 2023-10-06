import { useLoaderData } from "react-router-dom";
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getProductsByCategoryIdQuery,
} from "../lib/product";
import CategorySelect from "../components/CategorySelect";
import ProductList from "../components/ProductList";

export const loader =
  (queryClient) =>
  async ({ request }) => {
    let url = new URL(request.url);
    let categoryId = url.searchParams.get("categoryId");

    if (categoryId) {
      let categories = await queryClient.ensureQueryData(
        getAllCategoriesQuery()
      );
      let products = await queryClient.ensureQueryData(
        getProductsByCategoryIdQuery(categoryId)
      );

      const category = categories.find(
        (c) => Number(c.id) === Number(categoryId)
      );

      return { products, category };
    }
    let products = await queryClient.ensureQueryData(getAllProductsQuery());
    return { products };
  };

function Products() {
  const data = useLoaderData();

  return (
    <>
      <h1>{data.category ? data.category.name : "All products"}</h1>
      <CategorySelect />
      <ProductList products={data.products} />
    </>
  );
}

export default Products;
