const db = require("../db");

module.exports = class CartItemModel {
  static async create({ cartId, productId }) {
    try {
      const statement = `INSERT INTO cart_items (cart_id, product_id) VALUES ($1, $2) RETURNING *`;
      const values = [cartId, productId];
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

  static async findByCartId(cartId) {
    try {
      const statement = `SELECT * FROM cart_items WHERE cart_id = $1`;
      const values = [cartId];
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

  static async delete(id) {
    try {
      const statement = `DELETE FROM cart_items WHERE id = $1 RETURNING *`;
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
