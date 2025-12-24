const fs = require("fs");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const paths = require("./paths");
const common = require("./webpack.common");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3001;
const HTTPS = process.env.HTTPS === "true";

module.exports = merge(common, {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: paths.build,
    publicPath: "http://localhost:3001/",
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: '[name].[contenthash].chunk.js"',
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    host: HOST,
    port: PORT,
    https: HTTPS,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    setupMiddlewares(middlewares, devServer) {
      const setupProxyPath = paths.mockServer;
      if (fs.existsSync(setupProxyPath)) {
        require(setupProxyPath)(devServer.app);
      }
      return middlewares;
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Submitting a loan application",
      template: paths.public + "/index.html",
      chunks: ["index"],
      templateParameters: {
        configPath: "/config.js",
      },
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
});
