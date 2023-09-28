import { useLoaderData } from "react-router-dom";
import axios from "axios";

const productDetailQuery = (id) => ({
  queryKey: ["products", id],
  queryFn: () => axios(`/api/products/${id}`).then((res) => res.data),
});

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = productDetailQuery(params.id);
    return queryClient.ensureQueryData(query);
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
