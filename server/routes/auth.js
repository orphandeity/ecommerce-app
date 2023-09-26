const express = require("express");
const { body, matchedData, validationResult } = require("express-validator");
const router = express.Router();

const userService = require("../services/user");

module.exports = (app, passport) => {
  app.use("/api/auth", router);

  router.post(
    "/register",
    [
      body("username").trim().isAlphanumeric().isLength({ min: 3, max: 20 }),
      body("password")
        .trim()
        .escape()
        .isStrongPassword({ minLength: 6, maxLength: 20 }),
    ],
    async (req, res, next) => {
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      }
      const { username, password } = matchedData(req);
      try {
        // Check if username already exists
        const user = await userService.findByUsername(username);
        if (user) {
          return res.status(400).send({
            status: "error",
            message: "Username already exists",
          });
        } else {
          // Create new user
          const newUser = await userService.create(username, password);
          req.login(newUser, (err) => {
            if (err) return next(err);
            return res.status(200).send(newUser);
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/login",
    [
      body("username").trim().notEmpty().escape(),
      body("password").trim().notEmpty().escape(),
    ],
    (req, res, next) => {
      // Validate incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
      } else {
        next();
      }
    },
    // Authenticate user
    passport.authenticate("local", {
      successMessage: true,
      failureMessage: true,
    }),
    // Send user data
    (req, res, next) => {
      res.status(200).send(req.user);
    }
  );

  router.all("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ status: "success", message: "User logged out" });
    });
  });
};
