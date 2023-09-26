const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");

module.exports = class OrderService {
  static async create(userId) {
    try {
      const order = await OrderModel.create(userId);
      return order;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findByUserId(userId) {
    try {
      const order = await OrderModel.findByUserId(userId);
      return order;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findById(orderId) {
    try {
      const order = await OrderModel.findById(orderId);
      return order;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findItems(orderId) {
    try {
      const items = await OrderItemModel.findByOrderId(orderId);
      return items;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async addItem({ orderId, productId }) {
    try {
      const item = await OrderItemModel.create({ orderId, productId });
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }
};
