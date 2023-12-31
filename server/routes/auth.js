const express = require("express");
const { body, matchedData } = require("express-validator");
const { authenticate, validate } = require("../middleware");

const AuthService = require("../services/AuthService");

const router = express.Router();

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
      validate,
    ],
    async (req, res, next) => {
      const { username, password } = matchedData(req);
      try {
        let user = await AuthService.register({ username, password });
        req.login(user, (err) => {
          if (err) return next(err);
          return res.status(200).send(user);
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Local login
  router.post(
    "/login",
    [
      body("username").trim().notEmpty().escape(),
      body("password").trim().notEmpty().escape(),
      validate,
    ],
    passport.authenticate("local", {
      successMessage: true,
      failureMessage: true,
    }),
    (req, res, next) => {
      res.status(200).send(req.user);
    }
  );

  // Google login
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  // Google login callback
  router.get(
    "/google/redirect",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  router.all("/logout", [authenticate], (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ status: "success", message: "User logged out" });
    });
  });

  router.get("/status", (req, res, next) => {
    return res.status(200).send(req.isAuthenticated());
  });
};
