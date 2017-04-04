/**
 * Relational operators (>, >=, <, <=)
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators
 * See: http://stackoverflow.com/questions/14687876/how-do-the-javascript-relational-comparison-operators-coerce-types
 */

'use strict';

const Base = require('./base');

const OPERATORS = {
  '>': 'greater',
  '>=': 'greaterOrEqual',
  '<': 'less',
  '<=': 'lessOrEqual',
};

const ASSERT_STRING_NUMBER = `
  var lta = ta.toLowerCase();
  var ltb = tb.toLowerCase();
  var types = {number: 1, string: 1};
  if (lta !== ltb || !types.hasOwnProperty(lta) || !types.hasOwnProperty(ltb)) {
    msg = 'Relational operator should be used for two numbers or two strings';
  }
`;

module.exports = class Relational extends Base {
  constructor(options) {
    super(options, OPERATORS);
    this._buildTpl(ASSERT_STRING_NUMBER);
  }
};
