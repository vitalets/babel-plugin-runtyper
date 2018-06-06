
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './test/setup.js',
  output: {
    filename: 'test/setup.bundle.js',
    path: path.resolve('.temp')
  },
  optimization: {
    nodeEnv: false
  }
};
