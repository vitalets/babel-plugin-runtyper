/**
 * Runtyper entry point
 */

'use strict';

const options = require('./options');
const Comments = require('./comments');
const BinaryAssertions = require('./binary');

module.exports = function () {
  return {
    visitor: {
      BinaryExpression: {
        exit: function (path, state) {
          // Lazy create binaryAssertions instance
          if (!this.binaryAssertions) {
            this.options = options.create(state.opts);
            warnIfProduction(this.options);
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

function warnIfProduction(options) {
  const forbiddenNodeEnvs = options.forbiddenNodeEnvs || [];
  const nodeEnv = process.env.NODE_ENV;
  if (options.enabled && forbiddenNodeEnvs.indexOf(nodeEnv) >= 0) {
    console.warn( // eslint-disable-line no-console
      `WARNING: you are using Runtyper in forbidden NODE_ENV: ${nodeEnv}`
    );
  }
}
