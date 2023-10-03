import { authQuery } from "../lib/auth";
import CartItems from "../components/CartItems";
import { redirect } from "react-router-dom";

export const loader = (queryClient) => async () => {
  let isLoggedIn = await queryClient.ensureQueryData(authQuery());
  if (!isLoggedIn) return redirect("/login");
  return isLoggedIn;
};

function Checkout() {
  return (
    <>
      <h1>Checkout Page</h1>
      <CartItems />
    </>
  );
}

export default Checkout;
