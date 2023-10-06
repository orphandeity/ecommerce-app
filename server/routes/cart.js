const express = require("express");
const { body, param, matchedData } = require("express-validator");
const { authenticate, validate } = require("../middleware");
const CartService = require("../services/CartService");

const { DOMAIN, STRIPE_SK_TEST } = require("../config");

const Stripe = require("stripe");
const stripe = Stripe(STRIPE_SK_TEST);

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

  // Stripe checkout - https://stripe.com/docs/checkout/quickstart
  router.post("/create-checkout-session", [authenticate], async (req, res) => {
    let userId = req.user.id;
    let line_items = await CartService.createLineItems(userId);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${DOMAIN}message?success=true`,
      cancel_url: `${DOMAIN}message?canceled=true`,
    });

    res.redirect(session.url);
  });
};
