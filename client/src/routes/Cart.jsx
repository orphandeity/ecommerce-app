import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItemsQuery, removeFromCart } from "../lib/cart";

function Cart() {
  const queryClient = useQueryClient();
  const { data: items } = useQuery(getCartItemsQuery());

  const { mutate: removeItem } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(getCartItemsQuery());
    },
  });

  return (
    <div>
      <strong>Cart</strong>
      {items ? (
        <dl
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "50%",
          }}
        >
          {items.map((item) => (
            <div
              key={item.cart_item_id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
              }}
            >
              <dt>{item.name}</dt>
              <dd>{item.price_usd}</dd>
              <button onClick={() => removeItem(item.cart_item_id)}>
                Remove item
              </button>
            </div>
          ))}
        </dl>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
