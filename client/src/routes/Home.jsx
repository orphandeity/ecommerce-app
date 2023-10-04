import PropTypes from "prop-types";
import { useActionData, useLoaderData } from "react-router-dom";
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getProductsByCategoryIdQuery,
} from "../lib/product";

import CategorySelect from "../components/CategorySelect";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";

export const loader = (queryClient) => async () => {
  let products = await queryClient.ensureQueryData(getAllProductsQuery());
  let categories = await queryClient.ensureQueryData(getAllCategoriesQuery());
  return { categories, products };
};

export const action =
  (queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let categoryId = formData.get("categoryId");
    if (categoryId > 0) {
      let products = await queryClient.ensureQueryData(
        getProductsByCategoryIdQuery(categoryId)
      );
      return { products };
    } else if (categoryId == 0) {
      let products = await queryClient.ensureQueryData(getAllProductsQuery());
      return { products };
    }
  };

function Home() {
  let { categories, products } = useLoaderData();
  let actionData = useActionData();

  const [message, setMessage] = useState("");

  useEffect(() => {
    let query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <>
      <h1>Home Page</h1>
      <CategorySelect categories={categories} />
      <ProductList products={actionData ? actionData.products : products} />
    </>
  );
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Home;
