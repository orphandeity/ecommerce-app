import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function cart() {
  try {
    let response = await axios.get("/api/cart");
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const getCartQuery = () => ({
  queryKey: ["cart"],
  queryFn: cart,
});

async function addItem(productId) {
  try {
    let response = await axios.post("/api/cart/items", { productId });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export function useAddItem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productId) => addItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return mutation;
}

async function removeItem(productId) {
  try {
    let response = await axios.delete(`/api/cart/items/${productId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export function useRemoveItem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productId) => removeItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return mutation;
}

export async function checkout() {
  try {
    let response = await axios.post("/api/cart/checkout");
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export function useCheckout() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return mutation;
}
