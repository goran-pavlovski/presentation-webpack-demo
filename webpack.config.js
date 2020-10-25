const path = require('path');
const { mode } = require('webpack-nano/argv');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  mode
}
