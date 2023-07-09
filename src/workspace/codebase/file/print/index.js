// eslint-disable-next-line @typescript-eslint/no-require-imports
const { print } = require('recast');

module.exports = (ast, opts) => print(ast, opts);
