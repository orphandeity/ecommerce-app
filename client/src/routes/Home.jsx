import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
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
