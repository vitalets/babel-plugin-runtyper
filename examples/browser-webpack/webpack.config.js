'use strict';

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'babel-plugin-runtyper'
          ]
        }
      }
    ]
  }
};
