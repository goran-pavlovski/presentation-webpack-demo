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
    publicPath: ""
  },
  mode,
  watch: mode === 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    index: 'index.html',
    port: 9000,
    hot: true,
    hotOnly: true
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   type: "asset",
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 25000,
      //     },
      //   }
      // },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   loader: 'file-loader',
      // },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       limit: 25000,
      //     }
      //   }
      // },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //       // plugins: []
      //     }
      //   }
      // }
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
