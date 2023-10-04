const db = require("../db");

class CartItemModel {
  async create({ cartId, productId }) {
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

  async findByCartId(cartId) {
    try {
      // const statement = `SELECT * FROM cart_items WHERE cart_id = $1`;
      const statement = `
        SELECT ci.id AS cart_item_id, p.id as product_id, p.name, p.description, p.price_usd
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1
      `;
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

  async delete(id) {
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

  async deleteAll(cartId) {
    try {
      const statement = `DELETE FROM cart_items WHERE cart_id = $1 RETURNING *`;
      const values = [cartId];
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

  async totalPrice(cartId) {
    const statement = `
      SELECT SUM(products.price_usd) AS total_price
      FROM cart_items
      JOIN products ON cart_items.product_id = products.id
      WHERE cart_items.cart_id = $1
    `;
    const values = [cartId];
    const result = await db.query(statement, values);

    if (result.rows.length) {
      return result.rows[0];
    } else {
      return null;
    }
  }
}

module.exports = new CartItemModel();
