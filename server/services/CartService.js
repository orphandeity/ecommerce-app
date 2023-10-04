const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");

const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");

class CartService {
  async create(userId) {
    try {
      const cart = await CartModel.create(userId);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByUserId(userId) {
    try {
      const cart = await CartModel.findByUserId(userId);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  // load cart with items
  async loadCart(userId) {
    try {
      let cart = await CartModel.findByUserId(userId);
      if (cart) {
        let items = await CartItemModel.findByCartId(cart.id);
        cart.items = items;
        return cart;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async findItems(cartId) {
    try {
      const items = await CartItemModel.findByCartId(cartId);
      return items;
    } catch (err) {
      throw new Error(err);
    }
  }

  async addItem({ cartId, productId }) {
    try {
      const item = await CartItemModel.create({ cartId, productId });
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }

  async removeItem(id) {
    try {
      const item = await CartItemModel.delete(id);
      console.log(item);
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const cart = await CartModel.delete(id);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async checkout(userId, cartId, paymentInfo = {}) {
    try {
      const cartItems = await CartItemModel.findByCartId(cartId);
      const total = await CartItemModel.totalPrice(cartId);

      // TODO: process payment
      const paymentSuccessful = true;
      if (!paymentSuccessful) {
        return { message: "Payment failed" };
      }

      // create order
      const order = await OrderModel.create(userId);
      const newOrder = new OrderModel({
        orderId: order.id,
        userId,
        items: cartItems.map((item) => {
          return { orderId: order.id, productId: item.product_id };
        }),
      });

      // create order items
      newOrder.items = await Promise.all(
        newOrder.items.map(async (item) => {
          const orderItem = new OrderItemModel(item);
          const createdItem = await orderItem.create();

          return createdItem;
        })
      );

      // delete cart and cart items
      await CartItemModel.deleteAll(cartId);
      console.log(`\n\ncart items deleted`);

      await CartModel.delete(cartId);
      console.log(`\ncart ${cartId} deleted\n\n`);

      return newOrder;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new CartService();
