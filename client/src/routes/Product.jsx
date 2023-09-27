import { useLoaderData } from "react-router-dom";

export default function Product() {
  const product = useLoaderData();

  return (
    <>
      <h1>Product Page</h1>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price_usd}</p>
    </>
  );
}
