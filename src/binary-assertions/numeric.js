'use strict';

const Base = require('./base');

const OPERATORS = {
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
};

const ASSERT_NOT_NUMBERS = `
  if (typeof a !== 'number' || typeof b !== 'number') {
    NOTIFY(new Error('Numeric operation with non-numeric value: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

module.exports = class NumericAssertion extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._buildTpl([
      {tpl: ASSERT_NOT_NUMBERS}
    ]);
  }
};
