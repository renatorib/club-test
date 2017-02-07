module.exports = {
  babelrc: false,
  cacheDirectory: true,
  presets: [
    require.resolve('babel-preset-es2016'),
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('react-hot-loader/babel')
  ]
};
