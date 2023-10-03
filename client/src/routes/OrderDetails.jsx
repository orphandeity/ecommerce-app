import { useLoaderData } from "react-router-dom";
import { getOrderDetailsQuery } from "../lib/order";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      let { id } = params;
      return await queryClient.ensureQueryData(getOrderDetailsQuery(id));
    } catch (err) {
      return null;
    }
  };

function OrderDetails() {
  const order = useLoaderData();

  return (
    <div>
      <h2>Order Details</h2>
      <ol style={{ display: "grid", gap: "1rem" }}>
        {order.items.map((item) => (
          <li key={item.id}>
            <p>id: {item.id}</p>
            <p>order: {item.order_id}</p>
            <p>product: {item.product_id}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default OrderDetails;
