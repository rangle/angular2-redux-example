'use strict';

const loaders = require('./webpack/loaders');
const postcssInit = require('./webpack/postcss');

module.exports = (config) => {
  config.set({
    frameworks: [
      'jasmine',
      'source-map-support',
    ],

    files: ['./src/tests.entry.ts'],

    preprocessors: {
      './src/tests.entry.ts': [
        'webpack',
      ],
      './src/!(*.test|tests.*|*.d).ts': [
        'coverage',
      ],
    },

    webpack: {
      plugins: [],
      postcss: postcssInit,
      entry: './src/tests.entry.ts',
      devtool: 'inline-source-map',
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
      ],
      dir: './coverage/',
      subdir: () => 'report',
      includeAllSources: true,
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
