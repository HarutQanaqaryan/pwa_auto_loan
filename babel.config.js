module.exports = {
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        namespace: "react-template",
      },
    ],
  ],
  presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
};
