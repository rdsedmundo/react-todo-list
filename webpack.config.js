const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    vendor: ['react-hot-loader/patch', 'webpack-dev-server/client', 'webpack/hot/only-dev-server', 'react-hot-loader'],
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devServer: {
    contentBase: './public',
    hot: true,
    inline: true,
    port: 3000,
  },
};

module.exports = config;
