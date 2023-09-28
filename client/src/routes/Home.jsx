import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";

const productListQuery = () => ({
  queryKey: ["products"],
  queryFn: () => axios("/api/products").then((res) => res.data),
});

export const loader = (queryClient) => async () => {
  const query = productListQuery();
  return queryClient.ensureQueryData(query);
};

function Home() {
  const products = useLoaderData();

  return (
    <>
      <h1>Home Page</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Home;
