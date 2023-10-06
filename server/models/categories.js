const db = require("../db");

class CategoriesModel {
  async find() {
    try {
      const statement = `SELECT * FROM categories`;
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
}

module.exports = new CategoriesModel();
