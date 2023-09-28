import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./styles/reset.css";

import RootLayout, { loader as userLoader } from "./routes/RootLayout";
import Home, { loader as homeLoader } from "./routes/Home";
import Product, { loader as productLoader } from "./routes/Product";
import Login, { action as loginAction } from "./routes/Login";
import Signup, { action as signupAction } from "./routes/Signup";

const queryClient = new QueryClient(/** options */);

const router = createBrowserRouter([
  {
    path: "/",
    loader: userLoader(queryClient),
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader(queryClient),
      },
      {
        path: "products/:id",
        Component: Product,
        loader: productLoader(queryClient),
      },
      {
        path: "login",
        Component: Login,
        action: loginAction,
      },
      {
        path: "signup",
        Component: Signup,
        action: signupAction,
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
