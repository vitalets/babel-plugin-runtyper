'use strict';

const Base = require('./base');

const OPERATORS = {
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
};

const ASSERT_NOT_NUMBERS = `
  if (ta !== 'number' || tb !== 'number') {
    msg = 'Numeric operation with non-numeric value';
  }
`;

module.exports = class NumericAssertion extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._buildTpl(ASSERT_NOT_NUMBERS);
  }
};
