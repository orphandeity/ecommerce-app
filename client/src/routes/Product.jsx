import { useLoaderData } from "react-router-dom";
import { getProductByIdQuery } from "../lib/product";
import ProductDetail from "../components/ProductDetail";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    return queryClient.ensureQueryData(getProductByIdQuery(params.id));
  };

export default function Product() {
  const product = useLoaderData();

  return (
    <>
      <h1>Product Detail Page</h1>
      <ProductDetail product={product} />
    </>
  );
}
