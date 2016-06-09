'use strict';

exports.tslint = {
  test: /\.ts$/,
  loader: 'tslint',
  exclude: /node_modules/,
};

exports.tsTest = loadTs('awesome-typescript-loader', true);
exports.istanbulInstrumenter = loadTs('istanbul-instrumenter');
exports.ts = loadTs();

function loadTs(loader, inTest) {
  return {
    test: /\.ts$/,
    loader: loader || 'awesome-typescript-loader',
    exclude: inTest ? /node_modules/ :
      /(node_modules\/|\.test\.ts$|tests\.\w+\.ts$)/,
    query: {
      babelOptions: {
        sourceMaps: inTest ? 'inline' : null,
      },
    },
  };
}

exports.html = {
  test: /\.html$/,
  loader: 'raw',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,
  loader: 'to-string!css!postcss',
  exclude: /node_modules/,
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

function makeUrlLoader(pattern) {
  return {
    test: pattern,
    loader: 'url',
    exclude: /node_modules/,
  };
}
