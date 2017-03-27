
const BinaryVisitor = require('./binary-visitor');

module.exports = function() {
  return {
    visitor: {
      BinaryExpression(path, state) {
        if (state.opts.enabled || state.opts.enabled === undefined) {
          new BinaryVisitor(path).run();
        }
      }
    }
  };
};
