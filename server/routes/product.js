const express = require("express");
const {
  query,
  param,
  validationResult,
  matchedData,
} = require("express-validator");
const { validate } = require("../middleware");

const productService = require("../services/product");

const router = express.Router();

module.exports = (app) => {
  app.use("/api/products", router);

  router.get(
    "/",
    [query("categoryId").isInt().toInt().optional(), validate],
    async (req, res, next) => {
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
    [param("productId").isInt().toInt(), validate],
    async (req, res, next) => {
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
