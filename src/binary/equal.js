'use strict';

const t = require('babel-types');
const Base = require('./base');

const OPERATORS = {
  '===': 'strictEqual',
  '!==': 'notStrictEqual',
};

const ASSERT_NAN = `
  if (ta === 'NaN' || tb === 'NaN') {
    msg = 'Strict equal with NaN';
  }
`;

const ASSERT_EQUAL_TYPES = `
  if (!msg && ta !== tb NOT_INFINITY NOT_NULL NOT_UNDEFINED) {
    msg = 'Strict equal of different types';
  }
`;

const NOT_INFINITY = `&& ta !== 'Infinity' && tb !== 'Infinity'`;
const NOT_NULL = `&& a !== null && b !== null`;
const NOT_UNDEFINED = `&& a !== undefined && b !== undefined`;

module.exports = class EqualAssertion extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._customTypes = this._options.implicitEqualCustomTypes === 'allow' ? 0 : 1;
    this._buildTpl();
  }

  _buildTpl() {
    const notNull = this._options.implicitEqualNull === 'allow' ? NOT_NULL : '';
    const notUndefined = this._options.implicitEqualUndefined === 'allow' ? NOT_UNDEFINED : '';
    const assertEqualTypes = ASSERT_EQUAL_TYPES
      .replace('NOT_INFINITY', NOT_INFINITY)
      .replace('NOT_NULL', notNull)
      .replace('NOT_UNDEFINED', notUndefined);
    const tpl = [
      ASSERT_NAN.trim(),
      assertEqualTypes.trim(),
    ].join('\n');
    super._buildTpl(tpl);
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
    return this._options.explicitEqualTrue === 'allow' && isTrue(node);
  }

  _isExplicitAllowedFalse(node) {
    return this._options.explicitEqualFalse === 'allow' && isFalse(node);
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
