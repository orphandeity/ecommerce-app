import { useLoaderData } from "react-router-dom";
import { getAllProductsQuery } from "../lib/product";
import ProductList from "../components/ProductList";

export const loader = (queryClient) => async () => {
  return queryClient.ensureQueryData(getAllProductsQuery());
};

function Home() {
  const products = useLoaderData();

  return (
    <>
      <h1>Home Page</h1>
      <h2>Categories</h2>
      <ul>
        <li>Category 1</li>
        <li>Category 2</li>
        <li>Category 3</li>
        <li>Category 4</li>
        <li>Category 5</li>
      </ul>
      <ProductList products={products} />
    </>
  );
}

export default Home;
