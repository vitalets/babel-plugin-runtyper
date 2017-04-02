'use strict';

const t = require('babel-types');
const Base = require('./base');

const OPERATORS = {
  '+': 'add',
};

const ASSERT_STRING_NUMBER = `
  var types = ['number', 'string'];
  if (types.indexOf(typeof a) === -1 || types.indexOf(typeof b) === -1) {
    NOTIFY(new Error('Add operation should be used for numbers or strings: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

const ASSERT_EQUAL_TYPES = `
  if (typeof a !== typeof b) {
    NOTIFY(new Error('Add operation with different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

module.exports = class AddAssertion extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._buildTpl();
  }

  _buildTpl() {
    super._buildTpl([
      {tpl: ASSERT_STRING_NUMBER},
      {tpl: ASSERT_EQUAL_TYPES, level: this._options.implicitAddStringNumber},
    ]);
  }

  _needReplace() {
    // todo: under option
    return super._needReplace() && !this._hasExplicitEmptyString();
  }

  _hasExplicitEmptyString() {
    return isEmptyString(this._left) || isEmptyString(this._right);
  }
};

function isEmptyString(node) {
  return t.isStringLiteral(node) && node.value === '';
}
