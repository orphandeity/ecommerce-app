const express = require("express");
const { param } = require("express-validator");
const { authenticate, validate } = require("../middleware");

const OrderService = require("../services/order");

const router = express.Router();

module.exports = (app) => {
  app.use("/api/orders", router);

  // get all orders
  router.get("/", [authenticate], async (req, res, next) => {
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
    [authenticate, param("orderId").isInt().toInt(), validate],
    async (req, res, next) => {
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
