const express = require("express");
const {
  body,
  param,
  validationResult,
  matchedData,
} = require("express-validator");

const router = express.Router();

const CartService = require("../services/cart");

module.exports = (app) => {
  app.use("/api/cart", router);

  // create cart
  router.post("/", async (req, res, next) => {
    // Check if user is logged in
    if (!req.user) res.status(404).json({ message: "Not logged in" });
    try {
      const cart = await CartService.create(req.user.id);
      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  });

  // get cart
  router.get("/", async (req, res, next) => {
    // Check if user is logged in
    if (!req.user) res.status(404).json({ message: "Not logged in" });
    try {
      const cart = await CartService.findByUserId(req.user.id);
      if (!cart) {
        res.status(404).json({ message: "Not found" });
      } else {
        const items = await CartService.findItems(cart.id);
        res.status(200).json({ ...cart, items });
      }
    } catch (err) {
      next(err);
    }
  });

  // add item to cart
  router.post(
    "/items",
    [body("productId").isInt().toInt()],
    async (req, res, next) => {
      // Check if user is logged in
      if (!req.user) res.status(404).json({ message: "Not logged in" });
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { productId } = matchedData(req);
      try {
        const cart = await CartService.findByUserId(req.user.id);
        if (!cart) {
          res.status(404).json({ message: "Not found" });
        } else {
          const item = await CartService.addItem({
            cartId: cart.id,
            productId,
          });
          res.status(201).json(item);
        }
      } catch (err) {
        next(err);
      }
    }
  );

  // remove item from cart
  router.delete(
    "/items/:id",
    [param("id").isInt().toInt()],
    async (req, res, next) => {
      // Check if user is logged in
      if (!req.user) res.status(404).json({ message: "Not logged in" });
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { id } = matchedData(req);
      try {
        const item = await CartService.removeItem(id);
        if (item) res.status(200).json(item);
        else res.status(404).json({ message: "Not found" });
      } catch (err) {
        next(err);
      }
    }
  );

  // checkout
  router.post("/checkout", (req, res, next) => {
    // Check if user is logged in
    if (!req.user) res.status(404).json({ message: "Not logged in" });
    res.status(531).json({ message: "Not implemented" });
  });
};
