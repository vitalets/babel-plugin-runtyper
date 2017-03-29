'use strict';

const Base = require('./base');

const OPERATORS = {
  '+': 'add',
};

const ASSERT_STRING_NUMBER = `
  var types = ['number', 'string'];
  if (types.indexOf(typeof a) === -1 || types.indexOf(typeof b) === -1) {
    NOTIFY(new Error('Plus operation should be used for numbers or strings: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

const ASSERT_EQUAL_TYPES = `
  if (typeof a !== typeof b) {
    NOTIFY(new Error('Plus operation with different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b)));
  }
`;

module.exports = class PlusAssertion extends Base {
  constructor(options) {
    super(OPERATORS, [
      {tpl: ASSERT_STRING_NUMBER},
      {tpl: ASSERT_EQUAL_TYPES, level: options.concatStringNumber},
    ]);
  }
};
