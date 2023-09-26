const express = require("express");
const {
  query,
  param,
  validationResult,
  matchedData,
} = require("express-validator");
const router = express.Router();

const productService = require("../services/product");

module.exports = (app) => {
  app.use("/api/products", router);

  router.get(
    "/",
    [query("categoryId").isInt().toInt().optional()],
    async (req, res, next) => {
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { categoryId } = matchedData(req);
      if (categoryId) {
        // If categoryId is provided, return products in that category
        try {
          const products = await productService.findByCategoryId(categoryId);
          res.status(200).json(products);
        } catch (err) {
          next(err);
        }
      } else {
        // Otherwise, return all products
        try {
          const products = await productService.find();
          res.status(200).json(products);
        } catch (err) {
          next(err);
        }
      }
    }
  );

  router.get(
    "/:productId",
    [param("productId").isInt().toInt()],
    async (req, res, next) => {
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { productId } = matchedData(req);
      try {
        const product = await productService.findById(productId);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).send();
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
