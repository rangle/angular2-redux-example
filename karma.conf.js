'use strict';

const loaders = require('./webpack/loaders');
const webpack = require('webpack');
module.exports = (config) => {
  config.set({
    frameworks: [
      'jasmine',
      'source-map-support',
    ],

    files: ['./src/tests.entry.ts'],

    preprocessors: {
      './src/**/*.ts': [
        'webpack',
        'sourcemap',
      ],
      './src/**/!(*.test|tests.*).ts': [
        'coverage',
      ],
    },

    webpack: {
      plugins: [
        new webpack.NoErrorsPlugin(),
      ],
      entry: './src/tests.entry.ts',
      devtool: 'inline-source-map',
      verbose: true,
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
      },
      module: {
        loaders: [
          loaders.tsTest,
          loaders.css,
          loaders.svg,
        ],
        postLoaders: [
          loaders.istanbulInstrumenter,
        ],
      },
      stats: { colors: true, reasons: true },
      debug: true,
    },

    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    reporters: [
      'spec',
      'coverage',
    ],
    coverageReporter: {
      reporters: [
        { type: 'json' },
        { type: 'html' },
      ],
      dir: './coverage/',
      subdir: (browser) => {
        return browser.toLowerCase().split(/[ /-]/)[0]; // returns 'chrome'
      },
    },

    port: 9999,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'], // Alternatively: 'PhantomJS'
    captureTimeout: 6000,
    singleRun: true,
  });
};
