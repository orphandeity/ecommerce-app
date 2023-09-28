import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProductCard({ id, name, price }) {
  return (
    <Link to={`/products/${id}`}>
      <figure>
        <img src="https://www.picsum.photos/250" alt="" />
        <figcaption>
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
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        gap: "2rem",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price_usd}
        />
      ))}
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price_usd: PropTypes.number.isRequired,
    })
  ).isRequired,
};
