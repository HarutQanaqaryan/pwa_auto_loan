const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const paths = require("./paths");
const common = require("./webpack.common");

module.exports = merge(common, {
  entry: "./src/index.js",
  output: {
    path: paths.build,
    publicPath: "/",
    filename: "[name].[contenthash].bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  mode: "production",
  devtool: false,
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
              plugins: ["@babel/plugin-transform-runtime"],
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
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Submitting a loan application",
      filename: "index.html",
      template: paths.public + "/index.html",
      templateParameters: {
        configPath: "/config.js",
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: paths.public + "/config.js", to: paths.build },
        { from: paths.public + "/assets", to: paths.build + "/assets" },
        { from: paths.public + "/locales", to: paths.build + "/locales" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
