import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getImageModuleById } from "../lib/util";

import styles from "../styles/productList.module.css";

const imageModules = import.meta.glob("../assets/images/*.jpg");

function ProductCard({ id, name, price }) {
  const imgRef = useRef(null);

  useEffect(() => {
    getImageModuleById(imageModules, id).then((image) => {
      imgRef.current.src = image;
    });
  }, [id]);

  return (
    <Link to={`/products/${id}`} className={styles.link}>
      <figure className={styles.figure}>
        <img ref={imgRef} alt="" className={styles.image} />
        <figcaption className={styles.figcaption}>
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
    <ul className={styles.list}>
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
