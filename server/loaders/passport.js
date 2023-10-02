const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
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
        console.log("passport local strategy");
        const user = await userService.findByUsername(username);
        if (!user) return done(null, false);
        console.log("user ", user);

        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log("isMatch ", isMatch);

        if (!isMatch) return done(null, false);
        else return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  const { GOOGLE } = require("../config");
  const db = require("../db");

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE.CLIENT_ID,
        clientSecret: GOOGLE.CLIENT_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL,
      },
      async function verify(accessToken, refreshToken, profile, done) {
        // TODO: Auth servvice to handle this
        db.query(
          "SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2",
          ["https://accounts.google.com", profile.id],
          function (err, cred) {
            if (err) {
              return done(err);
            }

            if (!cred) {
              // The account at Google has not logged in to this app before.  Create a
              // new user record and associate it with the Google account.
              db.query(
                "INSERT INTO users (name) VALUES (?)",
                [profile.displayName],
                function (err) {
                  if (err) {
                    return done(err);
                  }

                  var id = this.lastID;
                  db.query(
                    "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
                    [id, "https://accounts.google.com", profile.id],
                    function (err) {
                      if (err) {
                        return done(err);
                      }

                      var user = {
                        id: id,
                        name: profile.displayName,
                      };
                      return done(null, user);
                    }
                  );
                }
              );
            } else {
              // The account at Google has previously logged in to the app.  Get the
              // user record associated with the Google account and log the user in.
              db.query(
                "SELECT * FROM users WHERE id = ?",
                [cred.user_id],
                function (err, user) {
                  if (err) {
                    return done(err);
                  }
                  if (!user) {
                    return done(null, false);
                  }
                  return done(null, user);
                }
              );
            }
          }
        );
      }
    )
  );

  return passport;
};
