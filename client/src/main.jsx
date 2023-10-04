import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import RootLayout, { action as logoutAction } from "./routes/RootLayout";
import Home, {
  loader as homeLoader,
  action as homeAction,
} from "./routes/Home";
import Product, { loader as productLoader } from "./routes/Product";
import Checkout, {
  loader as checkoutLoader,
  action as checkoutAction,
} from "./routes/Checkout";
import Orders, { loader as ordersLoader } from "./routes/Orders";
import OrderDetails, {
  loader as orderDetailsLoader,
} from "./routes/OrderDetails";
import Login, { action as loginAction } from "./routes/Login";
import Signup, { action as signupAction } from "./routes/Signup";

import "./styles/reset.css";
import "./styles/global.css";

const queryClient = new QueryClient(/** options */);

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    action: logoutAction(queryClient),
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader(queryClient),
        action: homeAction(queryClient),
      },
      {
        path: "products/:id",
        Component: Product,
        loader: productLoader(queryClient),
      },
      {
        path: "/checkout",
        Component: Checkout,
        loader: checkoutLoader(queryClient),
        action: checkoutAction,
      },
      {
        path: "/orders",
        Component: Orders,
        loader: ordersLoader(queryClient),
        children: [
          {
            path: ":id",
            Component: OrderDetails,
            loader: orderDetailsLoader(queryClient),
          },
        ],
      },
      {
        path: "login",
        Component: Login,
        action: loginAction(queryClient),
      },
      {
        path: "signup",
        Component: Signup,
        action: signupAction(queryClient),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* TODO: remove devtools in production */}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </StrictMode>
);
