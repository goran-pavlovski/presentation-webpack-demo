const path = require('path');
const { mode } = require('webpack-nano/argv');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');

module.exports = {
  entry: ['./src/index.ts', 'webpack-plugin-serve/client'],
  // entry: ['./src/index.ts'],
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   index: 'index.html',
  //   port: 9000,
  // },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: 'file-loader',
      },
      {
        test: /.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(woff2|woff|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
          },
        },
      },
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
      meta: {
        description: 'Some description'
      }
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
      open: true,
    }),
  ],
};
