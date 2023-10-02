const express = require("express");
const { body, param, matchedData } = require("express-validator");
const { authenticate, validate } = require("../middleware");

const router = express.Router();

const CartService = require("../services/CartService");

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
      const cart = await CartService.loadCart(req.user.id);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (err) {
      next(err);
    }
  });

  // add item to cart
  // looks for cart by user id and adds item to cart
  // if cart doesn't exist, creates new cart and adds item to cart
  router.post(
    "/items",
    [authenticate, body("productId").isInt().toInt(), validate],
    async (req, res, next) => {
      let { productId } = matchedData(req);
      try {
        let cart = await CartService.findByUserId(req.user.id);
        if (cart) {
          let item = await CartService.addItem({
            cartId: cart.id,
            productId,
          });
          res.status(201).json(item);
        } else {
          let newCart = await CartService.create(req.user.id);
          let item = await CartService.addItem({
            cartId: newCart.id,
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
