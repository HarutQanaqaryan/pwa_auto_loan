const proxy = require("express-http-proxy");

const settings = require("./settings.json");
require("dotenv-flow").config();

const { MOCK_SERVER } = process.env;
const PORT = settings.port ?? 4000;

const URLS = settings.urls.map((url) => url);

module.exports = function (app) {
  if (URLS.length && MOCK_SERVER) {
    app.use(
      URLS,
      proxy(`http://localhost:${PORT}`, {
        proxyReqPathResolver: (req) => req.originalUrl,
      }),
    );
  }
};
