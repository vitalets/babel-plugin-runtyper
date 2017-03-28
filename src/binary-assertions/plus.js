'use strict';

const BinaryAssertion = require('./binary-assertion');

const OPERATORS = {
  '+': 'add',
};

const TPL = `
  var f = VALUE_INFO;
  if (typeof a !== typeof b) {
    throw new Error('Plus operation with different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
  if (['number', 'string'].indexOf(typeof a) === -1) {
    throw new Error('Plus operation should be used for numbers or strings: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`;

module.exports = class PlusAssertion extends BinaryAssertion {
  constructor(options) {
    super(options, OPERATORS, TPL);
  }
};
