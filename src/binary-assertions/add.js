'use strict';

const t = require('babel-types');
const Base = require('./base');

const OPERATORS = {
  '+': 'add',
};

const ASSERT_STRING_NUMBER = `
  var lta = ta.toLowerCase();
  var ltb = tb.toLowerCase();
  var types = {number: 1, string: 1};
  if (!types.hasOwnProperty(lta) || !types.hasOwnProperty(ltb)) {
    msg = 'Add operation should be used for numbers or strings';
  }
`;

const ASSERT_EQUAL_TYPES = `
  if (!msg && lta !== ltb) {
    msg = 'Add operation with different types';
  }
`;

module.exports = class AddAssertion extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._buildTpl();
  }

  _buildTpl() {
    let tpl = ASSERT_STRING_NUMBER.trim();
    if (this._options.implicitAddStringNumber !== 'allow') {
      tpl += '\n' + ASSERT_EQUAL_TYPES.trim();
    }
    super._buildTpl(tpl);
  }

  _needReplace() {
    return super._needReplace() && !this._hasExplicitAllowedEmptyString();
  }

  _hasExplicitAllowedEmptyString() {
    return this._options.explicitAddEmptyString === 'allow'
      ? isEmptyString(this._left) || isEmptyString(this._right)
      : false;
  }
};

function isEmptyString(node) {
  return t.isStringLiteral(node) && node.value === '';
}
