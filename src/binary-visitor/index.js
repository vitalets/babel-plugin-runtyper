'use strict';

const t = require('babel-types');
const assertions = [
  require('./compare'),
  require('./numeric'),
  require('./plus'),
];

module.exports = class BinaryVisitor {
  constructor(path) {
    this._path = path;
  }

  run() {
    for (let assertion of assertions) {
      const tpl = assertion.getTpl(this._path);
      if (tpl) {
        const functionName = assertion.getFunctionName(this._path);
        this._replace(tpl, functionName);
        break;
      }
    }
  }

  _replace(tpl, functionName) {
    const replacement = tpl({
      NAME: t.identifier(functionName),
      OPERATOR: t.stringLiteral(this._path.node.operator),
      PARAM1: this._path.node.left,
      PARAM2: this._path.node.right,
      RESULT: t.binaryExpression(this._path.node.operator, t.identifier('a'), t.identifier('b'))
    });
    this._path.replaceWith(replacement);
    this._path.skip();
  }
};
