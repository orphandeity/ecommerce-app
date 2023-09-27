const express = require("express");
const {
  body,
  param,
  validationResult,
  matchedData,
} = require("express-validator");
const { authenticate, validate } = require("../middleware");

const router = express.Router();

const CartService = require("../services/cart");

module.exports = (app) => {
  app.use("/api/cart", router);

  // create cart
  router.post("/", [authenticate], async (req, res, next) => {
    try {
      const cart = await CartService.create(req.user.id);
      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  });

  // get cart
  router.get("/", [authenticate], async (req, res, next) => {
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
    [authenticate, body("productId").isInt().toInt(), validate],
    async (req, res, next) => {
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
    [authenticate, param("id").isInt().toInt(), validate],
    async (req, res, next) => {
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
  router.post("/checkout", [authenticate], async (req, res, next) => {
    try {
      const cart = await CartService.findByUserId(req.user.id);
      console.log("cart: ", cart);
      if (!cart) {
        res.status(404).json({ message: "Not found" });
      } else {
        const checkout = await CartService.checkout(req.user.id, cart.id);
        res.status(200).json(checkout);
      }
    } catch (err) {
      next(err);
    }
  });
};
