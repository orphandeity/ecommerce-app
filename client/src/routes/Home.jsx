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
      <ProductList products={products} />
    </>
  );
}

export default Home;
