const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('./babel');
const { app, own } = require('./paths');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: [
      require.resolve('react-hot-loader/patch'),
      `${require.resolve('webpack-hot-middleware/client')}?quiet=true`,
      // require.resolve('webpack/hot/only-dev-server'),
      own('app/index.js')
    ]
  },
  output: {
    path: app('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: { loader: own('node_modules/babel-loader'), query: babelConfig },
      exclude: [app('node_modules'), own('node_modules')]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [app('app'), own('app'), app('node_modules'), own('node_modules')],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: app('index.html'),
      filename: 'index.html',
      inject: true,
    }),
  ],
};
