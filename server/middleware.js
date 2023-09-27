const { validationResult } = require("express-validator");

function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ status: "error", message: "Not authenticated" });
}

function validate(req, res, next) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ status: "error", errors: errors.array() });
  }
  next();
}

module.exports = { authenticate, validate };
