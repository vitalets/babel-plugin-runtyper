'use strict';

const BinaryAssertions = require('./binary-assertions');

const defaultOptions = {
  enabled: true,
  allowStringNumberConcat: false
};

module.exports = function() {
  let binaryAssertions = null;
  return {
    visitor: {
      BinaryExpression(path, state) {
        if (!binaryAssertions) {
          const options = Object.assign({}, defaultOptions, state.opts);
          binaryAssertions = new BinaryAssertions(options);
        }

        if (binaryAssertions.enabled) {
          binaryAssertions.tryReplace(path);
        }
      }
    }
  };
};
