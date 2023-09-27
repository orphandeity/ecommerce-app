import { useLoaderData } from "react-router-dom";

function Home() {
  const products = useLoaderData();

  return (
    <>
      <h1>Home Page</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <a href={`/products/${product.id}`}>{product.name}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Home;
