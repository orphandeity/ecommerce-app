const bcrypt = require("bcrypt");
const userModel = require("../models/user");

class UserService {
  async findByUsername(username) {
    try {
      console.log("user service findByUsername");
      return await userModel.findByUsername(username);
    } catch (err) {
      throw new Error("Failed to find user");
    }
  }

  async findById(id) {
    return await userModel.findById(id);
  }

  async update(username, id) {
    return await userModel.update({ username, id });
  }

  async create(username, password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const response = await userModel.create({ username, hash });
      return response;
    } catch (err) {
      throw new Error("Failed to create user");
    }
  }
}

module.exports = new UserService();
