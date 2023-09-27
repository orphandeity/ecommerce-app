const db = require("../db");

module.exports = class OrderItemModel {
  constructor(data = {}) {
    this.order_id = data.orderId || null;
    this.product_id = data.productId || null;
  }

  async create() {
    try {
      const statement = `INSERT INTO order_items (order_id, product_id) VALUES ($1, $2) RETURNING *`;
      const values = [this.order_id, this.product_id];
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

  static async findByOrderId(orderId) {
    try {
      const statement = `SELECT * FROM order_items WHERE order_id = $1`;
      const values = [orderId];
      const result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};
