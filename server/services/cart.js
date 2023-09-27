const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");

const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");

module.exports = class CartService {
  static async create(userId) {
    try {
      const cart = await CartModel.create(userId);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findByUserId(userId) {
    try {
      const cart = await CartModel.findByUserId(userId);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async delete(id) {
    try {
      const cart = await CartModel.delete(id);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findItems(cartId) {
    try {
      const items = await CartItemModel.findByCartId(cartId);
      return items;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async addItem({ cartId, productId }) {
    try {
      const item = await CartItemModel.create({ cartId, productId });
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async removeItem(id) {
    try {
      const item = await CartItemModel.delete(id);
      console.log(item);
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async checkout(userId, cartId, paymentInfo = {}) {
    try {
      const cartItems = await CartItemModel.findByCartId(cartId);
      const total = await CartItemModel.totalPrice(cartId);
      console.log("total: ", total);
      console.log("cartItems: ", cartItems);

      // TODO: process payment
      const paymentSuccessful = true;
      if (!paymentSuccessful) {
        return { message: "Payment failed" };
      }

      // create order
      const order = await OrderModel.create(userId);
      console.log("order created: ", order);
      const newOrder = new OrderModel({
        orderId: order.id,
        userId,
        items: cartItems.map((item) => {
          return { orderId: order.id, productId: item.product_id };
        }),
      });
      console.log("new order: ", newOrder);

      // create order items
      newOrder.items = await Promise.all(
        newOrder.items.map(async (item) => {
          const orderItem = new OrderItemModel(item);
          console.log("order item: ", orderItem);
          const createdItem = await orderItem.create();
          console.log("created item: ", createdItem);

          return createdItem;
        })
      );

      // delete cart and cart items
      cartItems.forEach(async (item) => {
        await CartItemModel.delete(item.id);
      });
      await CartModel.delete(cartId);

      return newOrder;
    } catch (err) {
      throw new Error(err);
    }
  }
};
