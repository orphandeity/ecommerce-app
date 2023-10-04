const express = require("express");
const { body, param, matchedData } = require("express-validator");
const { authenticate, validate } = require("../middleware");
const { DOMAIN, STRIPE_TEST_SECRET_KEY } = "../config";

const stripe = require("stripe")(STRIPE_TEST_SECRET_KEY);

const CartService = require("../services/CartService");
const router = express.Router();

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
      let cart = await CartService.loadCart(req.user.id);
      if (cart) {
        res.status(200).json(cart);
      } else {
        let cart = await CartService.create(req.user.id);
        cart.items = [];
        res.status(200).json(cart);
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

  router.post(
    "/create-checkout-session",
    [authenticate],
    async (req, res, next) => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NxGV6CiNW1S46bgvG0A9QGi",
            quantity: 1,
          },
          {
            price: "price_1NxGS8CiNW1S46bgP0e5mrnC",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${DOMAIN}?success=true`,
        cancel_url: `${DOMAIN}?canceled=true`,
      });

      res.redirect(303, session.url);
    }
  );
};
