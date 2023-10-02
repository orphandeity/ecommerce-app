const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("../db");

const { SESSION_SECRET } = require("../config");

module.exports = (app) => {
  app.use(cors());
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
      store: new pgSession({ pool: db }),
    })
  );

  return app;
};
