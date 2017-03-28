'use strict';

const t = require('babel-types');
const BinaryAssertion = require('./binary-assertion');

const OPERATORS = {
  '===': 'strictEqual',
  '!==': 'notStrictEqual',
};

const TPL = `
  if (typeof a !== typeof b) {
    var f = VALUE_INFO;
    throw new Error('Strict compare of different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`;

module.exports = class CompareAssertion extends BinaryAssertion {
  constructor(options) {
    super(options, OPERATORS, TPL);
  }

  _needReplace() {
    return super._needReplace() && !this._isNullOrUndefinedNodes();
  }

  _isNullOrUndefinedNodes() {
    return isNullOrUndefined(this._left) || isNullOrUndefined(this._right);
  }
};

function isNullOrUndefined(node) {
  return t.isNullLiteral(node) || isUndefined(node);
}

function isUndefined(node) {
  return t.isIdentifier(node) && node.name === 'undefined';
}
