/** To disable private paths */
const DENIED_PATH_GROUPS = [
  // Private imports are prohibited, use public imports instead
  "./modules/**",
  "./common/*/*/**",
  // Prefer absolute imports instead of relatives (for root modules)
  "../**/modules",
  "../**/common",
];

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "import", "@typescript-eslint", "prettier"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": "off",
    "max-lines": ["warn", { skipBlankLines: true, skipComments: true, max: 350 }],
    eqeqeq: ["warn"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["StrictPascalCase"],
        suffix: ["IFace", "Type", "Props", "Class"],
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
      },
      {
        selector: "variable",
        modifiers: ["exported", "const"],
        types: ["boolean", "number", "string"],
        format: ["UPPER_CASE"],
      },
    ],
    "prettier/prettier": "error",
    "import/no-restricted-paths": [
      "warn",
      {
        zones: [
          {
            target: ["./src/common"],
            from: ["./src/modules/**", "./src/shared/**"],
            message: "Import modules to @common is forbiden.",
          },
          {
            target: [
              "./src/common/auth/**",
              "./src/common/components/**",
              "./src/common/config-service/**",
              "./src/common/data-access/**",
              "./src/common/event-bus-service/**",
              "./src/common/helpers/**",
              "./src/common/hooks/**",
              "./src/common/localization/**",
              "./src/common/logger/**",
              "./src/common/notifications/**",
              "./src/common/theme/**",
              "./src/common/types/**",
              "./src/modules/**",
              "./src/shared/**",
            ],
            from: ["./node_modules/nx-design"],
            message: "Import from nx-design forbiden, use components from @common/ui-kit",
          },
          {
            target: [
              "./src/common/components/**",
              "./src/common/config-service/**",
              "./src/common/data-access/**",
              "./src/common/event-bus-service/**",
              "./src/common/helpers/**",
              "./src/common/hooks/**",
              "./src/common/logger/**",
              "./src/common/localization/**",
              "./src/common/notifications/**",
              "./src/common/theme/**",
              "./src/common/types/**",
              "./src/common/ui-kit/**",
              "./src/modules/**",
              "./src/shared/**",
            ],
            from: ["./node_modules/oidc-client-ts", "./node_modules/react-oidc-context"],
            message: "import from oidc-client-ts and react-oidc-context forbiden, use components from @common/auth",
          },
          {
            target: [
              "./src/common/auth/**",
              "./src/common/components/**",
              "./src/common/config-service/**",
              "./src/common/data-access/**",
              "./src/common/event-bus-service/**",
              "./src/common/helpers/**",
              "./src/common/localization/**",
              "./src/common/notifications/**",
              "./src/common/theme/**",
              "./src/common/types/**",
              "./src/common/ui-kit/**",
              "./src/modules/**",
              "./src/shared/**",
            ],
            from: ["./node_modules/react-use-websocket"],
            message: "Import from react-use-websocket forbiden, use hook from @common/hooks",
          },
        ],
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
  },
};
