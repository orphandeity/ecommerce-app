import { useLoaderData } from "react-router-dom";
import { getProductByIdQuery } from "../lib/product";
import { useAddItem } from "../lib/cart";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../lib/auth";
import { useEffect, useRef } from "react";
import { getImageModuleById } from "../lib/util";

import styles from "../styles/productDetails.module.css";

const imageModules = import.meta.glob("../assets/images/*.jpg");

export const loader =
  (queryClient) =>
  async ({ params }) => {
    return queryClient.ensureQueryData(getProductByIdQuery(params.id));
  };

export default function Product() {
  const product = useLoaderData();

  const { data: isLoggedIn } = useQuery(authQuery());
  const { mutate: addItem, isLoading, isSuccess } = useAddItem();

  const imgRef = useRef(null);

  useEffect(() => {
    getImageModuleById(imageModules, product.id).then((image) => {
      imgRef.current.src = image;
    });
  }, [product.id]);

  function handleAddItem() {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }
    addItem(product.id);
  }

  return (
    <>
      <article className={styles.wrapper}>
        <img ref={imgRef} alt="" className={styles.image} />
        <div className={styles.details}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <b>${product.price_usd}</b>
          <button onClick={handleAddItem} disabled={isLoading}>
            Add to cart
          </button>
          {isSuccess && <p style={{ color: "red" }}>Added to cart!</p>}
        </div>
      </article>
    </>
  );
}
