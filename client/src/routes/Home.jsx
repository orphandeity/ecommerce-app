import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getProductsByCategoryIdQuery,
} from "../lib/product";
import ProductList from "../components/ProductList";

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
  let submit = useSubmit();

  return (
    <>
      <h1>Home Page</h1>
      <h2>Categories</h2>
      <Form
        method="post"
        onChange={(event) => {
          submit(event.currentTarget);
        }}
      >
        <select name="categoryId">
          <option value={0} selected>
            All products
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Form>
      <ProductList products={actionData ? actionData.products : products} />
    </>
  );
}

export default Home;
