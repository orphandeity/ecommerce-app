const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

class AuthService {
  async register(data) {
    const { username, password } = data;
    try {
      // Check if username already exists
      const user = await UserModel.findByUsername(username);
      if (user) {
        throw new Error("Username already exists");
      } else {
        // Create new user
        let hash = await bcrypt.hash(password, 10);
        return await UserModel.create({ local: { username, hash } });
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to register user");
    }
  }

  async login(data) {
    let { username, password } = data;
    try {
      // Check if user exists
      let user = await UserModel.findByUsername(username);
      if (!user) return false;
      // Check if password matches
      let match = await bcrypt.compare(password, user.password_hash);
      if (!match) return false;

      return user;
    } catch (err) {
      return done(err);
    }
  }

  async googleLogin(profile) {
    let { id, displayName } = profile;
    try {
      // check if user exists
      let user = await UserModel.findByGoogleId(id);
      // if not, create user
      if (!user) {
        return await UserModel.create({ google: { id, displayName } });
      } else {
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to login with Google");
    }
  }
}

module.exports = new AuthService();
