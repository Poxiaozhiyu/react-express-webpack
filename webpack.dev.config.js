'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getHtmlWebpackOptions = pages => {
  let options = [];
  pages.forEach(item => {
    options.push(new HtmlWebpackPlugin({
      hash: true,
      template: `./src/${item}.ejs`,
      inject: 'body',
      chunks: [item],
      filename: path.join(__dirname, 'views', `${item}.ejs`)
    }));
  });
  return options;
};

const getEntryOptions = pages => {
  let options = {};
  pages.forEach(item => {
    options[item] = [];
    options[item].push(path.join(__dirname, `src/containers/${item}.js`));
  });
  return options;
}


module.exports = {
  entry: getEntryOptions(['index', 'user']),
  output: {
    path: path.join(__dirname, 'static/javascript'),
    filename: '[name].js',
    publicPath: '/javascript'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-loader',
        query: { 
          variable: 'data', 
          interpolate: '\\{\\{(.+?)\\}\\}', 
          evaluate: '\\[\\[(.+?)\\]\\]' 
        }
      }
    ]
  },
  plugins: [
    ...getHtmlWebpackOptions(['index', 'user']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};

