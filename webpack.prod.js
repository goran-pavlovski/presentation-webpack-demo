const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
  ],
};

module.exports = merge(common, prodConfig);
