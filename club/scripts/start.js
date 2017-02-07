process.env.NODE_ENV = 'development';

const express = require('express');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const argv = require('yargs').argv;

const config = require('../config/webpack.config');
const { app, own } = require('../config/paths');

const DEFAULT_PORT = argv.port;

let compiler;
let handleCompile;

const setupCompiler = (port) => {
  const url = `http://localhost:${DEFAULT_PORT}/`;

  compiler = webpack(config, handleCompile);

  let isFirstCompile = true;

  compiler.plugin('done', (stats) => {
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSuccessful && (isFirstCompile);

    if (showInstructions) {
      console.log('The app is running at:', url);
      console.log();

      isFirstCompile = false;
    }

    if (messages.errors.length) {
      console.log('Failed to compile.');
      console.log();

      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });

      return;
    }

    if (messages.warnings.length) {
      console.log('Compiled with warnings.');
      console.log();

      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });

      console.log('You may use special comments to disable some warnings.');
      console.log('Use "// eslint-disable-next-line" to ignore the next line.');
      console.log('Use "/* eslint-disable */" to ignore all warnings in a file.');
    }
  });
};

const runDevServer = (port) => {
  const server = express();

  server.use(hotMiddleware(compiler, { log: false }));
  server.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: own('app'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  server.listen(port, (err) => {
    if (err) {
      console.log(err);
      exit(1);
    }
  });
};

module.exports = function() {
  setupCompiler(DEFAULT_PORT);
  runDevServer(DEFAULT_PORT);
};
