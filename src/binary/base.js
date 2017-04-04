'use strict';

const t = require('babel-types');
const template = require('babel-template');
const utils = require('../utils');

const WRAPPER_TPL = `
  (function NAME(a, b) {
    var t = ${utils.typeInfo.toString()};
    var s = ${utils.valueInfo.toString()};
    var ta = t(a, CUSTOM_TYPES);
    var tb = t(b, CUSTOM_TYPES);
    var msg = '';
    ASSERTIONS
    if (msg) {
      msg += ': ' + s(a, ta) + ' ' + OPERATOR + ' ' + s(b, tb);
      NOTIFY;
    }
    return RESULT;
  })(PARAM1, PARAM2)
`;

const LEVEL_NOTIFY = {
  'info': 'console.info(msg)',
  'warn': 'console.warn(new Error(msg))',
  'error': 'console.error(new Error(msg))',
  'break': 'throw new Error(msg)',
};

module.exports = class BaseAssertion {
  constructor(options, OPERATORS) {
    this._options = options;
    this._operators = OPERATORS;
    this._customTypes = 0;
    this._tpl = null;
  }

  tryReplace(path) {
    this._setPath(path);
    if (this._needReplace()) {
      this._replace();
      return true;
    }
  }

  _buildTpl(assertionsTpl) {
    const wrappedTpl = WRAPPER_TPL.trim()
      .replace('ASSERTIONS', assertionsTpl.trim())
      .replace('NOTIFY', LEVEL_NOTIFY[this._options.warnLevel])
      .replace(/CUSTOM_TYPES/g, this._customTypes);
    this._tpl = template(wrappedTpl);
  }

  _setPath(path) {
    this._path = path;
    this._operator = this._path.node.operator;
    this._left = this._path.node.left;
    this._right = this._path.node.right;
  }

  _needReplace() {
    return this._isSuitableOperator() && this._hasImplicitOperands();
  }

  _replace() {
    const replacement = this._tpl({
      NAME: t.identifier(this._getFunctionName()),
      OPERATOR: t.stringLiteral(this._operator),
      PARAM1: this._left,
      PARAM2: this._right,
      RESULT: t.binaryExpression(this._operator, t.identifier('a'), t.identifier('b'))
    });
    this._path.replaceWith(replacement);
    this._path.skip();
  }

  _getFunctionName() {
    return this._operators[this._operator];
  }

  _isSuitableOperator() {
    return this._operators.hasOwnProperty(this._operator);
  }

  _hasImplicitOperands() {
    return !isExplicitValue(this._left) || !isExplicitValue(this._right);
  }
};

function isExplicitValue(node) {
  return t.isLiteral(node) || isExplicitBinaryExpression(node);
}

function isExplicitBinaryExpression(node) {
  return t.isBinaryExpression(node) && isExplicitValue(node.left) && isExplicitValue(node.right);
}
