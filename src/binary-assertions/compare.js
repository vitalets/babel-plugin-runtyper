'use strict';

const t = require('babel-types');
const Base = require('./base');

const OPERATORS = {
  '===': 'strictEqual',
  '!==': 'notStrictEqual',
};

const ASSERT_EQUAL_TYPES = `
  if (typeof a !== typeof b NOT_NULL NOT_UNDEFINED) {
    NOTIFY(new Error('Strict compare of different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

const NOT_NULL = `&& a !== null && b !== null`;
const NOT_UNDEFINED = `&& a !== undefined && b !== undefined`;

module.exports = class CompareAssertion extends Base {
  constructor(options) {
    const notNull = options.strictCompareNull === 'allow' ? NOT_NULL : '';
    const notUndefined = options.strictCompareUndefined === 'allow' ? NOT_UNDEFINED : '';
    const tpl = ASSERT_EQUAL_TYPES
      .replace('NOT_NULL', notNull)
      .replace('NOT_UNDEFINED', notUndefined);
    super(OPERATORS, [{tpl}]);
  }

  _needReplace() {
    return super._needReplace() && !this._isNullOrUndefinedNodes();
  }

  /**
   * Comparison with explicit `null` or `undefined` considered intended by developer
   */
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
