module.exports = {
  bracketSpacing: true,
  printWidth: 120,
  semi: true,
  trailingComma: "all",
  endOfLine: "auto",
  overrides: [
    {
      files: "package*.json",
      options: {
        printWidth: 1000,
      },
    },
  ],
};
