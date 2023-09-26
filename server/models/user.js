const db = require("../db");

module.exports = class UserModel {
  async create(data) {
    try {
      const statement = `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`;
      const values = [data.username, data.passwordHash];
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

  async update(data) {
    try {
      const statement = `UPDATE users SET username = $1 WHERE id = $2 RETURNING *`;
      const values = [data.username, data.id];
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

  async findByUsername(username) {
    try {
      const statement = `SELECT * FROM users WHERE username = $1`;
      const values = [username];
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

  async findById(id) {
    try {
      const statement = `SELECT * FROM users WHERE id = $1`;
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
