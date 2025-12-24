module.exports = {
  extends: [require.resolve("stylelint-config-standard")],
  customSyntax: require.resolve("postcss-styled-syntax"),
  ignoreFiles: ["./coverage/**/*", "./dist/**/*", "./node_modules/**/*", "./src/**/__snapshots__/**/*"],
  rules: {
    "max-nesting-depth": 2,
    "selector-class-pattern":
      "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
  },
};
