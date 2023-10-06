import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
    <div>
      <b>{message}</b>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};
