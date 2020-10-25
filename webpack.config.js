const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path');
const { mode } = require('webpack-nano/argv');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  mode,
  watch: mode === 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    index: 'index.html',
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    })
  ]
}
