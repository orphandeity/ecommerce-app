const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");

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
};
