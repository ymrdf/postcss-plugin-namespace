var postcss = require('postcss')
var plugin = require('./src/index.js')

module.exports = postcss.plugin('postcss-plugin-namespace', plugin)
