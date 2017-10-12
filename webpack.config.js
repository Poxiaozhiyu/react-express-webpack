'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 添加佛祖或神兽保佑的插件，参数为buddha或alpaca，默认参数为buddha
const BuddhaPlugin = require('./my_plugins/buddha');

const getHtmlWebpackOptions = pages => {
  let options = [];
  pages.forEach(item => {
    options.push(new HtmlWebpackPlugin({
      template: `./src/${item}.ejs`,
      inject: 'body',
      chunks: [item],
      filename: path.join(__dirname, 'views', `${item}.ejs`),
      favicon: path.join(__dirname, 'src', 'images/favicon.png')
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
    path: path.join(__dirname, 'static'),
    filename: '[name]-[hash].js',
    publicPath: ''
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: false,
      compress: {
        warnings: false
      }
    }),
    ...getHtmlWebpackOptions(['index', 'user']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BuddhaPlugin()
  ]
};

