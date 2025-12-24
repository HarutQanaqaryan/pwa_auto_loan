const path = require("path");

module.exports = {
  src: path.resolve(__dirname, "../src"),
  build: path.resolve(__dirname, "../dist"),
  public: path.resolve(__dirname, "../public"),
  mockServer: path.resolve(__dirname, "../mock-server/setupProxy.js"),
};
