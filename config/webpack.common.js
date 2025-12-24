const webpack = require("webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");

const { aliases } = require("./aliases");
const { rules } = require("./commonRules");
const packages = require("../package.json");

const dependencies = packages.dependencies;

const { ModuleFederationPlugin } = webpack.container;

require("dotenv-flow").config();

module.exports = {
  module: {
    rules: rules,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: aliases,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.LOG_LEVEL": JSON.stringify(process.env.LOG_LEVEL),
    }),
    new ModuleFederationPlugin({
      name: "credit_conveyor", // parameter scope
      filename: "remoteEntry.js",
      exposes: {
        // loanApps: "./src/modules/loan-apps/LoanApps.tsx", // parameter module
        // products: "./src/modules/products/Products.tsx", // parameter module
        // tasks: "./src/modules/tasks/Tasks.tsx", // parameter module
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
        "react-router": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-router"],
        },
        "styled-components": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["styled-components"],
        },
        "react-oidc-context": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-oidc-context"],
        },
      },
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
