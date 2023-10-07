import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const imageModules = import.meta.glob("../assets/images/*.jpg");

function getImageModuleById(id) {
  let imagePath = `../assets/images/product_${id}.jpg`;
  let modulePath = imageModules[imagePath];
  if (!modulePath) {
    throw new Error(`Image module not found for id ${id}`);
  }
  return modulePath().then((module) => module.default);
}

function ProductCard({ id, name, price }) {
  const imgRef = useRef(null);

  useEffect(() => {
    getImageModuleById(id).then((image) => {
      imgRef.current.src = image;
    });
  }, [id]);

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
        <img ref={imgRef} alt="" />
        <figcaption
          style={{
            padding: "var(--padding)",
            backgroundColor: "var(--background-secondary-color)",
          }}
        >
          <b>{name}</b>
          <p>${price}</p>
        </figcaption>
      </figure>
    </Link>
  );
}

export default function ProductList({ products }) {
  if (!products) return null;
  return (
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
