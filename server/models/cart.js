const db = require("../db");

module.exports = class CartModel {
  static async create(userId) {
    try {
      const statement = `INSERT INTO user_carts (user_id) VALUES ($1) RETURNING *`;
      const values = [userId];
      const result = await db.query(statement, values);
      console.log(result.rows);

      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findByUserId(userId) {
    try {
      const statement = `SELECT * FROM user_carts WHERE user_id = $1`;
      const values = [userId];
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

  static async findById(cartId) {
    try {
      const statement = `SELECT * FROM user_carts WHERE id = $1`;
      const values = [cartId];
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

  static async delete(id) {
    try {
      const statement = `DELETE FROM user_carts WHERE id = $1 RETURNING *`;
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
