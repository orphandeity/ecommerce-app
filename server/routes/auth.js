const express = require("express");
const router = express.Router();

module.exports = (app, passport) => {
  app.use("/api/auth", router);

  router.post("/register", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
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
