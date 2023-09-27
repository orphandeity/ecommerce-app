import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home, { loader as homeLoader } from "./routes/Home";
import Product, { loader as productLoader } from "./routes/Product";
import "./styles/reset.css";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        loader: homeLoader,
        Component: Home,
      },
      {
        path: "/products/:id",
        loader: productLoader,
        Component: Product,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
