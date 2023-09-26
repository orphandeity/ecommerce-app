const expressLoader = require("./express");
const passportLoader = require("./passport");
const routeLoader = require("../routes");

module.exports = async (app) => {
  // Express middleware
  const expressApp = await expressLoader(app);
  // Passport middleware
  const passport = await passportLoader(expressApp);
  // Routes
  await routeLoader(app, passport);
  // Errors
  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).json({ message });
  });
};
