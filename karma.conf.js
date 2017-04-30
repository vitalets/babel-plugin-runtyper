'use strict';

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    singleRun: true,
    files: [
      //'test/specs/comment.spec.js'
      //'test/specs/options.spec.js'
      //'test/specs/add.spec.js'
      'test/specs/**/*.js'
    ],
    client: {
      mocha: {
        require: [require.resolve('./test/setup.bundle.js')],
      }
    }
  });
};
