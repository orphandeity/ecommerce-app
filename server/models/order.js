const db = require("../db");
const OrderItem = require("./orderItem");

module.exports = class OrderModel {
  constructor(data = {}) {
    this.id = data.orderId || null;
    this.userId = data.userId || null;
    this.items = data.items || [];
  }

  addItems(items) {
    this.items = items.map(
      (item) => new OrderItem({ productId: item.productId, orderId: this.id })
    );
  }

  static async create(userId) {
    try {
      const statement = `INSERT INTO orders (user_id) VALUES ($1) RETURNING *`;
      const values = [userId];
      const result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error("Error creating order");
    }
  }

  static async findByUserId(userId) {
    try {
      const statement = `SELECT * FROM orders WHERE user_id = $1`;
      const values = [userId];
      const result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findById(id) {
    try {
      const statement = `SELECT * FROM orders WHERE id = $1`;
      const values = [id];
      const result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};
