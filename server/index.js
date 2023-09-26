const express = require("express");
const app = express();

const loaders = require("./loaders");

const { PORT } = require("./config");

async function startServer() {
  loaders(app);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
}

startServer();
