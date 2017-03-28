const template = require('babel-template');
const utils = require('../utils');
const wrapperTpl = require('./wrapper');

const OPERATORS = {
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
};

const tpl = `
  if (typeof a !== 'number' || typeof b !== 'number') {
    var f = ${utils.valueInfo};
    throw new Error('Numeric operation with non-numeric value: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`;

const wrappedTpl = wrapperTpl.replace('ASSERTION', tpl.trim());
const compiledTpl = template(wrappedTpl);

exports.getTpl = function (path) {
  if (OPERATORS.hasOwnProperty(path.node.operator)) {
    return compiledTpl;
  }
};

exports.getFunctionName = function (path) {
  return OPERATORS[path.node.operator];
};
