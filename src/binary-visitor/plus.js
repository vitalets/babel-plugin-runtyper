const template = require('babel-template');
const utils = require('../utils');
const wrapperTpl = require('./wrapper');

const OPERATORS = {
  '+': 'add',
};

const tpl = `
  var f = ${utils.valueInfo};
  if (typeof a !== typeof b) {
    throw new Error('Plus operation with different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
  if (['number', 'string'].indexOf(typeof a) === -1) {
    throw new Error('Plus operation should be used for numbers or strings: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
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

