const db = require("../db");

class UserModel {
  async create(data) {
    if (data.google) {
      let username = data.google.displayName;
      let googleData = JSON.stringify(data.google);
      try {
        let statement = `INSERT INTO users (username, google) VALUES ($1, $2) RETURNING *`;
        let values = [username, googleData];
        let result = await db.query(statement, values);

        if (result.rows.length) {
          return result.rows[0];
        } else {
          return null;
        }
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create user");
      }
    }

    if (data.local) {
      let { username, hash } = data.local;
      try {
        const statement = `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`;
        const values = [username, hash];
        const result = await db.query(statement, values);

        if (result.rows.length) {
          return result.rows[0];
        } else {
          return null;
        }
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create user");
      }
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

  // TODO: combine the methods below into one method that takes an object with a key and value

  async findByUsername(username) {
    console.log("user model findByUsername: ", username);
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
      console.error(err);
      throw new Error("Failed to find user");
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

  async findByGoogleId(id) {
    try {
      let statement = `SELECT * FROM users WHERE google ->> 'id' = $1`;
      let values = [id];
      let result = await db.query(statement, values);

      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new UserModel();
