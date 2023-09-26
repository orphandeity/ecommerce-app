const express = require("express");
const { param, validationResult, matchedData } = require("express-validator");
const router = express.Router();

const OrderService = require("../services/order");

module.exports = (app) => {
  app.use("/api/orders", router);

  // get all orders
  router.get("/", async (req, res, next) => {
    // Check if user is logged in
    if (!req.user) res.status(404).json({ message: "Not logged in" });

    try {
      const orders = await OrderService.findByUserId(req.user.id);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  });

  // get order by id
  router.get(
    "/:orderId",
    [param("orderId").isInt().toInt()],
    async (req, res, next) => {
      // Check if user is logged in
      if (!req.user) res.status(404).json({ message: "Not logged in" });
      // Check if orderId is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      try {
        const order = await OrderService.findById(req.params.orderId);
        // Check if order belongs to user
        if (order.user_id !== req.user.id) {
          return res.status(403).json({ message: "Forbidden" });
        } else {
          // Get order items
          const items = await OrderService.findItems(order.id);
          return res.status(200).json({ ...order, items });
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
