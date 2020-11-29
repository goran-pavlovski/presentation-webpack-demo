const { WebpackPluginServe } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
      open: true,
    }),
  ],
});

exports.page = ({ title }) => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './index.html',
      chunks: ['app', 'vendor'],
      filename: 'index.html' //relative to root of the application
    }),
    new HtmlWebpackPlugin({
      title: 'My Awesome Login',
      myPageHeader: 'Login',
      template: './src/app/login/login.html',
      chunks: ['login', 'vendor'],
      filename: 'login.html'
    })
  ],
});

exports.loadCSS = () => ({
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
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options,
            },
            'css-loader',
          ].concat(loaders),
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options,
            },
            'css-loader',
            'sass-loader',
          ].concat(loaders),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
  };
};

exports.loadImages = ({ options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
});

exports.loadFonts = ({ options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(woff2|woff|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavascript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // plugins: []
          },
        },
      },
    ],
  },
});

exports.loadTypescript = () => ({
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.loadHTML = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
});
