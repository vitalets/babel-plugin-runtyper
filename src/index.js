/**
 * Runtyper entry point
 */

'use strict';

const options = require('./options');
const Comments = require('./comments');
const BinaryAssertions = require('./binary');

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
            this.comments = new Comments(state);
          }

          if (this.options.enabled && !this.comments.containsDisabledLines(path.node)) {
            const replaced = this.binaryAssertions.tryReplace(path);
            if (replaced) {
              // todo: maybe there is better way to avoid recursion traverse (test with react build)
              path.node.createdByRuntyper = true;
            }
          }
        }
      },
      CallExpression: {
        enter(path) {
          if (path.node.createdByRuntyper) {
            path.skip();
          }
        }
      }
    }
  };
};
