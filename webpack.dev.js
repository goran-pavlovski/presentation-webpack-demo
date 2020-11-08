const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const devConfig = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = merge(common, devConfig);
