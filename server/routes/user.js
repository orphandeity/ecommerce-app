const express = require("express");
const {
  param,
  body,
  validationResult,
  matchedData,
} = require("express-validator");
const { authenticate, validate } = require("../middleware");

const userService = require("../services/user");

const router = express.Router();

module.exports = (app) => {
  app.use("/api/user", router);

  router.get("/", [authenticate], async (req, res, next) => {
    try {
      const user = await userService.findById(req.user.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/",
    [
      authenticate,
      body("username").trim().isAlphanumeric().isLength({ min: 3, max: 20 }),
      validate,
    ],
    async (req, res, next) => {
      const { username } = matchedData(req);
      try {
        // Check if username is taken
        const usernameTaken = await userService.findByUsername(username);
        if (usernameTaken) {
          return res.status(409).json({ message: "Username already taken" });
        } else {
          // Update user
          const user = await userService.update(username, req.user.id);
          res.status(200).send(user);
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
