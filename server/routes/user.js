const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/api/users", router);

  router.get("/:userId", (req, res, next) => {
    res.status(531).json({ message: "Not implemented" });
  });

  router.put("/:userId", (req, res, next) => {
    const { userId } = req.params;
    const { username } = req.body;
    res.status(531).json({ message: "Not implemented" });
  });
};
