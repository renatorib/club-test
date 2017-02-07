const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('./babel');
const { app, own } = require('./paths');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    own('app/index.js')
  ],
  output: {
    path: app('build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          { loader: own('node_modules/babel-loader'), query: babelConfig }
        ],
        exclude: [app('node_modules'), own('node_modules')]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [app('app'), own('app'), app('node_modules'), own('node_modules')]
  }
};

console.log(module.exports.resolve.modules);
