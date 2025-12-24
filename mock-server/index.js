const apiMocker = require("connect-api-mocker");
const express = require("express");

const settings = require("./settings.json");

const app = express();

app.use(apiMocker("mock-server/api"));

const PORT = settings.port ?? 4000;

app.listen(PORT, console.log(`Mock Server listening on port: \x1b[32m${PORT}\x1b[0m\n`));
