const express = require("express");
const { body, param, matchedData } = require("express-validator");
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
  // looks for cart by user id and finds all items in cart
  router.get("/", [authenticate], async (req, res, next) => {
    try {
      const cart = await CartService.findByUserId(req.user.id);
      if (cart) {
        const items = await CartService.findItems(cart.id);
        res.status(200).json({ ...cart, items });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (err) {
      next(err);
    }
  });

  // add item to cart
  // looks for cart by user id and creates new cartItem with cart id and product id
  router.post(
    "/items",
    [authenticate, body("productId").isInt().toInt(), validate],
    async (req, res, next) => {
      const { productId } = matchedData(req);
      try {
        const cart = await CartService.findByUserId(req.user.id);
        if (cart) {
          const item = await CartService.addItem({
            cartId: cart.id,
            productId,
          });
          res.status(201).json(item);
        } else {
          res.status(404).json({ message: "Not found" });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  // remove item from cart
  // deletes cartItem by id
  router.delete(
    "/items/:id",
    [authenticate, param("id").isInt().toInt(), validate],
    async (req, res, next) => {
      const { id } = matchedData(req);
      try {
        const item = await CartService.removeItem(id);
        res.status(200).json(item);
      } catch (err) {
        next(err);
      }
    }
  );

  // checkout
  // looks for cart by user id and calls checkout function
  router.post("/checkout", [authenticate], async (req, res, next) => {
    try {
      const cart = await CartService.findByUserId(req.user.id);
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
