import PropTypes from "prop-types";
import { useAddItem } from "../lib/cart";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../lib/auth";

export default function ProductDetail({ product }) {
  const { data: isLoggedIn } = useQuery(authQuery());
  const { mutate: addItem, isLoading, isSuccess } = useAddItem();

  function handleAddItem() {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }
    addItem(product.id);
  }

  return (
    <article>
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}
      >
        <img src="https://www.picsum.photos/1200/800" alt="" />
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price_usd}</p>
          <button onClick={handleAddItem} disabled={isLoading}>
            Add to cart
          </button>
          {isSuccess && <p style={{ color: "red" }}>Added to cart!</p>}
        </div>
      </div>
    </article>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price_usd: PropTypes.string.isRequired,
  }).isRequired,
};
