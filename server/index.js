const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db");
const app = express();

const { PORT, SESSION_SECRET } = require("./config");

// Middleware
app.use(helmet());
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

// Routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Errors
app.use((err, req, res, next) => {
  const { message, status } = err;
  return res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
