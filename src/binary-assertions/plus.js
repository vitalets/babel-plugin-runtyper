'use strict';

const BaseBinaryAssertion = require('./base');

const OPERATORS = {
  '+': 'add',
};

const TPL = `
  var f = VALUE_INFO;
  var types = ['number', 'string'];
  if (types.indexOf(typeof a) === -1 || types.indexOf(typeof b) === -1) {
    throw new Error('Plus operation should be used for numbers or strings: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
  ASSERT_EQUAL_TYPES
`;

const EQUAL_TYPES_TPL = `
  if (typeof a !== typeof b) {
    throw new Error('Plus operation with different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`;

module.exports = class PlusAssertion extends BaseBinaryAssertion {
  constructor(options) {
    const assertEqualTypes = options.allowStringNumberConcat ? '' : EQUAL_TYPES_TPL;
    const tpl = TPL.replace('ASSERT_EQUAL_TYPES', assertEqualTypes.trim());
    super(options, OPERATORS, tpl);
  }
};
