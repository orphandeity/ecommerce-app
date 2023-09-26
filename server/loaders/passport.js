const passport = require("passport");
const LocalStrategy = require("passport-local");

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

  // configure local strategy to be used for local login
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // TODO: check to see if the username exists
      // if (!user) return done(null, false, { message: "Incorrect username or password" });
      // TODO: check to see if the password matches the hashed password from the database
      // if (password !== hashedPassword) return done(null, false, { message: "Incorrect username or password" });
      // return done(null, user);
    })
  );
};
