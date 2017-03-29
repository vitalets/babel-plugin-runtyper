'use strict';

const t = require('babel-types');
const Base = require('./base');

const OPERATORS = {
  '===': 'strictEqual',
  '!==': 'notStrictEqual',
};

const ASSERT_EQUAL_TYPES = `
  if (typeof a !== typeof b) {
    NOTIFY(new Error('Strict compare of different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

module.exports = class CompareAssertion extends Base {
  constructor() {
    super(OPERATORS, [
      {tpl: ASSERT_EQUAL_TYPES}
    ]);
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
