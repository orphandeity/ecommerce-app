const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const userService = require("../services/user");

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

  // local login
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userService.getUserByUsername(username);
        if (!user) return done(null, false);

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return done(null, false);
        else return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  return passport;
};
