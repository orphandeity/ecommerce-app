const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/api/order", router);

  // get all orders
  router.get("/", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  // get order by id
  router.get("/:orderId", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });
};
