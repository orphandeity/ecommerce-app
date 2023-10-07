import { useLoaderData } from "react-router-dom";
import { getProductByIdQuery } from "../lib/product";
import { useAddItem } from "../lib/cart";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../lib/auth";
import { useEffect, useRef } from "react";
import { getImageModuleById } from "../lib/util";

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
      <h1>Product Page</h1>
      <article>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "1rem",
          }}
        >
          <img ref={imgRef} alt="" />
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
    </>
  );
}
