'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourceMap = process.env.TEST
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.ts$/ })]
  : [ ];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.[hash].js',
    chunks: ['app', 'vendor'],
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    minify: false,
  }),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' },
  ]),
].concat(sourceMap);

const devPlugins = [
  new StyleLintPlugin({
    configFile: './.stylelintrc',
    files: 'src/**/*.css',
    failOnError: false,
  }),
];

const prodPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    mangle: { keep_fnames: true },
    compress: {
      warnings: false,
    },
  }),
];

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);
