import PropTypes from "prop-types";

export default function ProductDetail({ product }) {
  return (
    <article>
      <h2>{product.name}</h2>
      <img src="https://www.picsum.photos/800/450" alt="" />
      <p>{product.description}</p>
      <p>{product.price_usd}</p>
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
