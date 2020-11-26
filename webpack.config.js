const path = require('path');
const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');

const commonConfig = merge([
  {
    entry: {
      main: './src/index.ts',
      // app: {
      //   import: path.join(__dirname, 'src', 'index.ts'),
      //   dependOn: 'vendor'
      // },
      // vendor: ['react', 'react-dom', 'bootstrap', 'moment']
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },
    /* 1. Separate vendor files */

    // optimization: {
    //   splitChunks: { chunks: "all" }
    // },

    /*2. Split each npm package*/

    // optimization: {
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     chunks: 'all',
    //     maxInitialRequests: Infinity,
    //     minSize: 0,
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name(module) {
    //           // get the name. E.g. node_modules/packageName/not/this/part.js
    //           // or node_modules/packageName
    //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //
    //           // npm package names are URL-safe, but some servers don't like @ symbols
    //           return `npm.${packageName.replace('@', '')}`;
    //         },
    //       },
    //     },
    //   },
    // },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  },
  parts.page({ title: 'Webpack Demo' }),
  // parts.loadCSS(),
  parts.extractCSS(),
  parts.loadImages({
    options: { name: '[name].[ext]',  outputPath: 'images', },
  }),
  parts.loadHTML(),
  parts.loadFonts({
    options: {
      outputPath: 'fonts',
    },
  }),
  // parts.loadJavascript(),
  parts.loadTypescript(),
  parts.clean(),
]);

const productionConfig = merge([
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.devServer(),
]);
const developmentConfig = merge([
  {
    entry: ['webpack-plugin-serve/client'],
  },
  parts.devServer(),
  parts.generateSourceMaps({ type: 'eval-source-map' }),
]);

const getConfig = mode => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development':
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode,  ${mode}`);
  }
};

module.exports = getConfig(mode);
