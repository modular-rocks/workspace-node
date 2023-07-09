const { print } = require("recast")
module.exports = (ast, opts) => print(ast, opts)