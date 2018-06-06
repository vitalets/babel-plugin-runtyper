'use strict';

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    singleRun: true,
    files: [
      'test/specs/**/*.js'
    ],

    client: {
      mocha: {
        require: [require.resolve('./.temp/test/setup.bundle.js')],
      }
    }
  });
};
