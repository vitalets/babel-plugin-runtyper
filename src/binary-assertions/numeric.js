'use strict';

const BinaryAssertion = require('./binary-assertion');

const OPERATORS = {
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
};

const TPL = `
  if (typeof a !== 'number' || typeof b !== 'number') {
    var f = VALUE_INFO;
    throw new Error('Numeric operation with non-numeric value: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`;

module.exports = class NumericAssertion extends BinaryAssertion {
  constructor(options) {
    super(options, OPERATORS, TPL);
  }
};
