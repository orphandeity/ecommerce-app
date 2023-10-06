import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesQuery } from "../lib/product";
import { useNavigate } from "react-router-dom";

function CategorySelect() {
  const { data: categories } = useQuery(getAllCategoriesQuery());

  const navigate = useNavigate();

  return (
    <select
      name="categories"
      id="categories"
      onChange={(e) => {
        navigate(e.target.value);
      }}
    >
      <option value="/">All products</option>
      {categories?.map((category) => (
        <option key={category.id} value={`/?categoryId=${category.id}`}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;
