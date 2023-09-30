import PropTypes from "prop-types";

export default function ProductDetail({ product }) {
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
          <button>Add to cart</button>
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
