const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/api/cart", router);

  // create cart
  router.post("/", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  // get cart
  router.get("/", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  // add item to cart
  router.post("/items", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  // remove item from cart
  router.delete("/items", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  // checkout
  router.post("/checkout", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });
};
