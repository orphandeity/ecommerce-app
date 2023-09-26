const express = require("express");
const router = express.Router();
const {
  param,
  body,
  validationResult,
  matchedData,
} = require("express-validator");

const userService = require("../services/user");

module.exports = (app) => {
  app.use("/api/users", router);

  router.get(
    "/:userId",
    [param("userId").isInt().toInt()],
    async (req, res, next) => {
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { userId } = matchedData(req);
      try {
        const user = await userService.findById(userId);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send();
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:userId",
    [
      param("userId").isInt().toInt(),
      body("username").trim().isAlphanumeric().isLength({ min: 3, max: 20 }),
    ],
    async (req, res, next) => {
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { username, userId } = matchedData(req);
      try {
        // Check if username is taken
        const usernameTaken = await userService.findByUsername(username);
        if (usernameTaken) {
          return res.status(409).json({ message: "Username already taken" });
        } else {
          // Update user
          const user = await userService.update(username, userId);
          res.status(200).send(user);
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
