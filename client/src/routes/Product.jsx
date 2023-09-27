import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const response = await fetch(`/api/products/${params.id}`);
  const data = await response.json();
  return data;
};

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
