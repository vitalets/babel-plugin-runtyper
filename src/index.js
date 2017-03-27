
const BinaryVisitor = require('./binary-visitor');

module.exports = function() {
  return {
    visitor: {
      BinaryExpression(path) {
        new BinaryVisitor(path).run();
      }
    }
  };
};
