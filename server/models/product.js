const db = require("../db");

class ProductModel {
  // find all products
  async find() {
    try {
      const statement = `SELECT * FROM products`;
      const result = await db.query(statement);

      if (result.rows.length) {
        return result.rows;
      } else {
        return [];
      }
    } catch (err) {
      throw err;
    }
  }

  async findByCategoryId(categoryId) {
    try {
      const statement = `SELECT * FROM products
          WHERE id IN (
            SELECT product_id
            FROM product_categories
            WHERE category_id = $1
          )`;
      const values = [categoryId];
      const result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows;
      } else {
        return [];
      }
    } catch (err) {
      throw err;
    }
  }

  async findById(id) {
    try {
      const statement = `SELECT * FROM products WHERE id = $1`;
      const values = [id];
      const result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new ProductModel();
