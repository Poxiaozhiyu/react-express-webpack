'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config.js');

for (let key in config.entry) {
  config.entry[key].unshift("webpack-dev-server/client?http://localhost:3000/");
}

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
});
server.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening at localhost:3000');
  }
});