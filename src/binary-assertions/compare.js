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
    super(options, OPERATORS);
    this._buildTpl();
  }

  _buildTpl() {
    const notNull = this._options.implicitCompareNull === 'allow' ? NOT_NULL : '';
    const notUndefined = this._options.implicitCompareUndefined === 'allow' ? NOT_UNDEFINED : '';
    const tpl = ASSERT_EQUAL_TYPES
      .replace('NOT_NULL', notNull)
      .replace('NOT_UNDEFINED', notUndefined);
    super._buildTpl([{tpl}]);
  }

  _needReplace() {
    return super._needReplace() && !this._hasExplicitAllowedValue();
  }

  /**
   * Comparison with explicit `null` or `undefined` considered intended by developer
   */
  _hasExplicitAllowedValue() {
    return this._isExplicitAllowedValue(this._left) || this._isExplicitAllowedValue(this._right);
  }

  _isExplicitAllowedValue(node) {
    return isNullOrUndefined(node) || this._isExplicitAllowedBoolean(node);
  }

  _isExplicitAllowedBoolean(node) {
    return this._isExplicitAllowedTrue(node) || this._isExplicitAllowedFalse(node);
  }

  _isExplicitAllowedTrue(node) {
    return this._options.explicitCompareTrue === 'allow' && isTrue(node);
  }

  _isExplicitAllowedFalse(node) {
    return this._options.explicitCompareFalse === 'allow' && isFalse(node);
  }
};

function isNullOrUndefined(node) {
  return t.isNullLiteral(node) || isUndefined(node);
}

function isUndefined(node) {
  return t.isIdentifier(node) && node.name === 'undefined';
}

function isTrue(node) {
  return t.isBooleanLiteral(node) && node.value === true;
}

function isFalse(node) {
  return t.isBooleanLiteral(node) && node.value === false;
}
