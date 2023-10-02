const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const bcrypt = require("bcrypt");

const AuthService = require("../services/AuthService");

const { GOOGLE } = require("../config");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // set method to serialize data to store in cookies
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // set method to deserialize data stored in cookies and attach to req.user
  passport.deserializeUser((user, done) => {
    done(null, { id: user.id, username: user.username });
  });

  // Local login
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      try {
        let response = await AuthService.login({ username, password });
        return cb(null, response);
      } catch (err) {
        return cb(err);
      }
    })
  );

  // Google login
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE.CLIENT_ID,
        clientSecret: GOOGLE.CLIENT_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          let user = await AuthService.googleLogin(profile);
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  return passport;
};
