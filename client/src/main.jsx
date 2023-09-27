import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home from "./routes/Home";
import homeLoader from "./loaders/home";
import Product from "./routes/Product";
import productLoader from "./loaders/product";
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
