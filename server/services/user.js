const bcrypt = require("bcrypt");
const userModel = require("../models/user");

class UserService {
  async findByUsername(username) {
    try {
      const user = await userModel.findByUsername(username);
      console.log("user service return: ", user);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to find user");
    }
  }

  async findById(id) {
    console.log("user service findById: ", id);
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (err) {
      throw new Error("Failed to find user");
    }
  }

  async update(username, id) {
    try {
      const user = await userModel.update({ username, id });
      return user;
    } catch (err) {
      throw new Error("Failed to update user");
    }
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
