const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/api/products", router);

  router.get("/", (req, res, next) => {
    const { categoryId } = req.query;
    res.status(531).json({ message: "Not implemented" });
  });

  router.get("/:productId", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });
};
