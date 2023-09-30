import PropTypes from "prop-types";
import { Form, useSubmit } from "react-router-dom";

function CategorySelect({ categories }) {
  let submit = useSubmit();

  return (
    <>
      <Form
        replace
        method="post"
        onChange={(event) => {
          submit(event.currentTarget);
        }}
      >
        <label
          style={{ display: "flex", gap: "1rem", padding: "var(--padding) 0" }}
        >
          <strong>Categories</strong>
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
        </label>
      </Form>
    </>
  );
}

CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategorySelect;
