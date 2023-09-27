import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./styles/reset.css";

import RootLayout from "./routes/RootLayout";
import Home, { loader as homeLoader } from "./routes/Home";
import Product, { loader as productLoader } from "./routes/Product";
import Login, { action as loginAction } from "./routes/Login";
import Signup, { action as signupAction } from "./routes/Signup";

const queryClient = new QueryClient(/** options */);

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: homeLoader(queryClient),
        Component: Home,
      },
      {
        path: "products/:id",
        loader: productLoader(queryClient),
        Component: Product,
      },
      {
        path: "login",
        action: loginAction,
        Component: Login,
      },
      {
        path: "signup",
        action: signupAction,
        Component: Signup,
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
