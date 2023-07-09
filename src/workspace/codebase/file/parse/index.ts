const parser = require("@babel/parser")

const babelConfig = {
  sourceType: "module",
  createParenthesizedExpressions: true,
  plugins: [
    'jsx',
    ['typescript', {isTSX: true}],
    'babel-plugin-recast'
  ]
};

export default (code: string) => parser.parse(code, babelConfig)