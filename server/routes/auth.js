const express = require("express");
const router = express.Router();

const userService = require("../services/user");

module.exports = (app, passport) => {
  app.use("/api/auth", router);

  router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await userService.findByUsername(username);
      if (user) {
        return res.status(400).send({
          status: "error",
          message: "Username already exists",
        });
      } else {
        const newUser = await userService.create(username, password);
        req.login(newUser, (err) => {
          if (err) return next(err);
          return res.status(200).send(newUser);
        });
      }
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/login",
    passport.authenticate("local", {
      successMessage: true,
      failureMessage: true,
    }),
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
