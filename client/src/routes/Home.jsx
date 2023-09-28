import { useLoaderData, Link } from "react-router-dom";

const productListQuery = () => ({
  queryKey: ["products"],
  queryFn: () => fetch("/api/products").then((res) => res.json()),
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
