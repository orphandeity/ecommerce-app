import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProductCard({ id, name, price }) {
  return (
    <Link
      to={`/products/${id}`}
      style={{
        color: "var(--foreground-color",
        textDecoration: "none",
      }}
    >
      <figure
        style={{
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--shadow)",
          outline: "1px solid var(--shadow-outline-color)",
          overflow: "hidden",
        }}
      >
        <img src="https://www.picsum.photos/250" alt="" />
        <figcaption
          style={{
            padding: "var(--padding)",
            backgroundColor: "var(--background-secondary-color)",
          }}
        >
          <h3>{name}</h3>
          <p>{price}</p>
        </figcaption>
      </figure>
    </Link>
  );
}

export default function ProductList({ products }) {
  if (!products) return null;
  return (
    <div>
      <h2>Product List</h2>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexFlow: "row wrap",
          gap: "2rem",
        }}
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price_usd}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price_usd: PropTypes.string.isRequired,
    })
  ).isRequired,
};
