const userModel = require("../models/user");

class UserService {
  async getUserByUsername(username) {
    return await userModel.findByUsername(username);
  }

  async getUserById(id) {
    return await userModel.findById(id);
  }

  async updateUser(username, id) {
    return await userModel.update({ username, id });
  }

  async createUser(username, passwordHash) {
    return await userModel.create({ username, password });
  }
}

module.exports = new UserService();
