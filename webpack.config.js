const path = require('path');
const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');

const commonConfig = merge([
  {
    entry: ['./src/index.ts'],
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  },
  parts.page({ title: 'Webpack Demo' }),
  // parts.loadCSS(),
  parts.extractCSS(),
  parts.loadImages({
    options: { limit: 15000, name: '[name].[ext]' },
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

const productionConfig = merge([parts.generateSourceMaps({ type: 'source-map' })]);
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
