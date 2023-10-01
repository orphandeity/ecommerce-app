import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../lib/cart";

function CartItems({ products }) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <dl
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "50%",
      }}
    >
      {products.map((product, idx) => (
        <div
          key={idx}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
          }}
        >
          <dt>{product.name}</dt>
          <dd>{product.price_usd}</dd>
          <button onClick={() => mutate(product.id)} disabled={isLoading}>
            Remove item
          </button>
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
