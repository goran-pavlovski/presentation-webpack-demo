const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const { mode } = require('webpack-nano/argv');

module.exports = {
  entry: ['./src/index.js', 'webpack-plugin-serve/client'],
  // entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode,
  watch: mode === 'development',
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   index: 'index.html',
  //   port: 9000,
  //   hot: true,
  //   hotOnly: true
  // },
  devtool: false,
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
      open: true
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
  ],
};
