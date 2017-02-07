const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('../config/webpack.config');
const { app } = require('../config/paths');

const runDevServer = () => {
  const server = express();
  const compiler = webpack(config);

  server.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
  }));

  server.use(require('webpack-hot-middleware')(compiler));

  server.get('*', function(req, res) {
    res.sendFile(app('index.html'));
  });

  server.listen(3000, function(err) {
    if (err) {
      return console.error(err);
    }

    console.log('Listening at http://localhost:3000/');
  });
}

module.exports = runDevServer;
