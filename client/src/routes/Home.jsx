import { useLoaderData } from "react-router-dom";
import { getAllCategoriesQuery, getAllProductsQuery } from "../lib/product";
import ProductList from "../components/ProductList";

export const loader = (queryClient) => async () => {
  let products = await queryClient.ensureQueryData(getAllProductsQuery());
  let categories = await queryClient.ensureQueryData(getAllCategoriesQuery());
  return { categories, products };
};

function Home() {
  const { categories, products } = useLoaderData();

  return (
    <>
      <h1>Home Page</h1>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <ProductList products={products} />
    </>
  );
}

export default Home;
