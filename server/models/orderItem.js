const db = require("../db");

module.exports = class OrderItemModel {
  constructorr(data = {}) {
    this.orderId = data.orderId || null;
    this.productId = data.productId || null;
  }

  async create() {
    try {
      const statement = `INSERT INTO order_items (order_id, product_id) VALUES ($1, $2) RETURNING *`;
      const values = [this.orderId, this.productId];
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

  // static async create(data) {
  //   try {
  //     const statement = `INSERT INTO order_items (order_id, product_id) VALUES ($1, $2) RETURNING *`;
  //     const values = [data.orderId, data.productId];
  //     const result = await db.query(statement, values);

  //     if (result.rows.length) {
  //       return result.rows[0];
  //     } else {
  //       return null;
  //     }
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

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
