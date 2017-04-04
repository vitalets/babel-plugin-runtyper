'use strict';

const Base = require('./base');

const OPERATORS = {
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
};

const ASSERT_NOT_NUMBERS = `
  var lta = ta.toLowerCase();
  var ltb = tb.toLowerCase();
  if (lta !== 'number' || ltb !== 'number') {
    msg = 'Numeric operation with non-numeric value';
  }
`;

module.exports = class NumericAssertion extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._buildTpl(ASSERT_NOT_NUMBERS);
  }
};
