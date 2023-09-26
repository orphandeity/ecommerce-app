const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/api/auth", router);

  router.post("/register", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  router.post("/login", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  router.all("/logout", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });
};
