
const t = require('babel-types');
const template = require('babel-template');
const utils = require('../utils');
const wrapperTpl = require('./wrapper');

const OPERATORS = ['===', '!=='];

const tpl = `
  if (typeof a !== typeof b) {
    var f = ${utils.valueInfo};
    throw new Error('Strict compare of different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`;

const wrappedTpl = wrapperTpl.replace('ASSERTION', tpl.trim());
const compiledTpl = template(wrappedTpl);

exports.getTpl = function (path) {
  if (!isStrictCompare(path.node.operator)) {
    return;
  }
  if (isNullOrUndefined(path.node.left) || isNullOrUndefined(path.node.right)) {
    return;
  }
  return compiledTpl;
};

function isStrictCompare(operator) {
  return OPERATORS.indexOf(operator) >= 0;
}

function isNullOrUndefined(node) {
  return t.isNullLiteral(node) || isUndefined(node);
}

function isUndefined(node) {
  return t.isIdentifier(node) && node.name === 'undefined';
}
