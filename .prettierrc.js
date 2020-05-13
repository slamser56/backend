module.exports = {
    bracketSpacing: true,
    parserOptions: {
         ecmaVersion: 2020,
         sourceType: "module"
    },
    extends: [
      "plugin:react/recommended",
       "plugin:@typescript-eslint/recommended"
     ],
    jsxBracketSameLine: true,
    singleQuote: true,
    trailingComma: 'all',
  };