'use strict';

const loaders = require('./webpack/loaders');
const postcssInit = require('./webpack/postcss');

module.exports = (config) => {
  config.set({
    frameworks: [
      'jasmine',
    ],

    plugins: [
      'karma-jasmine',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-chrome-launcher',
    ],

    files: [
      './src/tests.entry.ts',
      {
        pattern: '**/*.map',
        served: true,
        included: false,
        watched: true,
      },
    ],

    preprocessors: {
      './src/**/*.ts': [
        'webpack',
        'sourcemap',
      ],
      './src/**/!(*.test|tests.*).ts': [
        'coverage',
        'sourcemap',
      ],
    },

    webpack: {
      plugins: [],
      postcss: postcssInit,
      entry: './src/tests.entry.ts',
      devtool: 'inline-source-map',
      verbose: false,
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
      },
      module: {
        loaders: combinedLoaders(),
        postLoaders: [
          loaders.istanbulInstrumenter,
        ],
      },
      stats: { colors: true, reasons: true },
      debug: false,
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

function combinedLoaders() {
  return Object.keys(loaders).reduce(function reduce(aggregate, k) {
    switch (k) {
    case 'tslint': // intolerably slow
      return aggregate;
    case 'ts':
    case 'tsTest':
      return aggregate.concat([ // force inline source maps
        Object.assign(loaders[k],
          { query: { babelOptions: { sourceMaps: 'inline' } } })]);
    default:
      return aggregate.concat([loaders[k]]);
    }
  },
  []);
}
