const { Pool } = require("pg");
const { DB } = require("../config");

let instance = null;

class Database {
  constructor() {
    if (!instance) {
      instance = this;
      this.pool = new Pool({
        user: DB.PGUSER,
        host: DB.PGHOST,
        database: DB.PGDATABASE,
        password: DB.PGPASSWORD,
        port: DB.PGPORT,
      });
    }

    return instance;
  }

  query(text, params) {
    return this.pool.query(text, params);
  }
}

module.exports = new Database();
