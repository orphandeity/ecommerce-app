import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getOrdersQuery } from "../lib/order";

export const loader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(getOrdersQuery());
};

function Orders() {
  const orders = useLoaderData();

  return (
    <>
      <h1>Orders Page</h1>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        <ol style={{ display: "grid", gap: "1rem" }}>
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/orders/${order.id}`}>{order.created_at}</Link>
            </li>
          ))}
        </ol>
        <Outlet />
      </div>
    </>
  );
}

export default Orders;
