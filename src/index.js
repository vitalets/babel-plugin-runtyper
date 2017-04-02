'use strict';

const options = require('./options');
const BinaryAssertions = require('./binary-assertions');

if (process.env.NODE_ENV === 'production') {
  console.log('WARNING: you are using Runtyper in production build!');  // eslint-disable-line no-console
}

module.exports = function () {
  return {
    visitor: {
      BinaryExpression: {
        exit: function (path, state) {
          if (!this.binaryAssertions) {
            this.options = options.create(state.opts);
            this.binaryAssertions = new BinaryAssertions(this.options);
          }

          if (this.options.enabled) {
            this.binaryAssertions.tryReplace(path);
          }
        }
      }
    }
  };
};
