import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Message() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    let query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation. ✌️");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready. ✌️"
      );
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        placeContent: "center",
        marginTop: "8rem",
        textAlign: "center",
      }}
    >
      <b>{message}</b>
      <Link to="/">Continue shopping</Link>
    </div>
  );
}
