const path = require('path');
const { mode } = require('webpack-nano/argv');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/index.ts', 'webpack-plugin-serve/client'],
  // entry: ['./src/index.ts'],
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  mode,
  watch: mode === 'development',
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   index: 'index.html',
  //   port: 9000,
  //   hot: true,
  //   hotOnly: true,
  // },
  devtool: mode === 'development' ? 'inline-source-map' : false,
  resolve: {
    extensions: ['.ts', '.js'],
  },
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
        use: 'html-loader',
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
      // },
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
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
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
    new CleanWebpackPlugin(),
  ],
};
