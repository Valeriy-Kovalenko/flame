module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: ["/*.svg", "/*.png"],
  rules: {
    "max-len": [
      "warn",
      {
        code: 120,
        ignoreStrings: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": 0,
    // "@typescript-eslint/ban-ts-comment": 0,
    // "@typescript-eslint/no-explicit-any": 0,
  },
};
