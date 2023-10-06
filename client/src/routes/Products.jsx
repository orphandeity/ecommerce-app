import { useLoaderData } from "react-router-dom";
import {
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
      return await queryClient.ensureQueryData(
        getProductsByCategoryIdQuery(categoryId)
      );
    }
    return await queryClient.ensureQueryData(getAllProductsQuery());
  };

function Products() {
  const data = useLoaderData();

  return (
    <>
      <h1>Products Page</h1>
      <CategorySelect />
      <ProductList products={data} />
    </>
  );
}

export default Products;
