
module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-runtyper']
          }
        }
      }
    ]
  }
};
