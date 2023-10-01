import PropTypes from "prop-types";

function CartItems({ products }) {
  return (
    <dl
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "50%",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
          }}
        >
          <dt>{product.name}</dt>
          <dd>{product.price_usd}</dd>
          <button>Remove item</button>
        </div>
      ))}
    </dl>
  );
}

CartItems.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price_usd: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CartItems;
