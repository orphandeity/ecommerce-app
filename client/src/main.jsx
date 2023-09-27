import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home, { loader as homeLoader } from "./routes/Home";
import Product, { loader as productLoader } from "./routes/Product";
import Login, { action as loginAction } from "./routes/Login";
import Signup, { action as signupAction } from "./routes/Signup";
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
        path: "products/:id",
        loader: productLoader,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
