'use strict';

const BinaryAssertions = require('./binary-assertions');

if (process.env.NODE_ENV === 'production') {
  console.log('WARNING: you are using Runtyper in production build!');  // eslint-disable-line no-console
}

const defaultOptions = {
  enabled: true,
  allowStringNumberConcat: false,
  allowStrictCompareNull: false,
  allowStrictCompareUndefined: false,
};

module.exports = function () {
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
