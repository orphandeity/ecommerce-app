import axios from "axios";

async function getOrders() {
  try {
    const response = await axios.get("/api/orders");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const getOrdersQuery = () => ({
  queryKey: ["orders"],
  queryFn: getOrders,
});

async function getOrderDetails(orderId) {
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const getOrderDetailsQuery = (orderId) => ({
  queryKey: ["orders", { id: orderId }],
  queryFn: () => getOrderDetails(orderId),
});
