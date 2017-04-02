'use strict';

const options = require('./options');
const BinaryAssertions = require('./binary-assertions');

if (process.env.NODE_ENV === 'production') {
  console.log('WARNING: you are using Runtyper in production build!');  // eslint-disable-line no-console
}

module.exports = function () {
  let binaryAssertions = null;
  return {
    visitor: {
      BinaryExpression: {
        exit: function (path, state) {
          if (!binaryAssertions) {
            const opts = options.create(state.opts);
            binaryAssertions = new BinaryAssertions(opts);
          }

          if (options.isEnabled()) {
            binaryAssertions.tryReplace(path);
          }
        }
      }
    }
  };
};
