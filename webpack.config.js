const path = require('path');
const GasPlugin = require("gas-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    report: [
      './src/main.ts'
    ],
  },
  devtool: false,
  output: {
    libraryTarget: 'this',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', '.ts'
    ]
  },
  plugins: [
    new GasPlugin(),
    new webpack.EnvironmentPlugin([
      'PROFILE_ID',
    ])
  ]
};