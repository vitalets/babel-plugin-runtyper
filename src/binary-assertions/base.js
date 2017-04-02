'use strict';

const t = require('babel-types');
const template = require('babel-template');
const utils = require('../utils');

const WRAPPER_TPL = `
  (function NAME(a, b) {
    var f = ${utils.valueInfo.toString()};
    ASSERTIONS
    return RESULT;
  })(PARAM1, PARAM2)
`;

const LEVEL_NOTIFY = {
  'allow': '',
  'warn': 'console.warn',
  'error': 'console.error',
  'break': 'throw',
};

module.exports = class BaseBinaryAssertion {
  constructor(options, OPERATORS) {
    this._options = options;
    this._operators = OPERATORS;
    this._tpl = null;
  }

  tryReplace(path) {
    this._setPath(path);
    if (this._needReplace()) {
      this._replace();
      return true;
    }
  }

  _buildTpl(tpls) {
    const tpl = tpls.map(item => {
      const level = item.level || this._options.defaultLevel;
      const command = LEVEL_NOTIFY[level];
      return command ? item.tpl.trim().replace('NOTIFY', command) : '';
    }).filter(Boolean).join('\n');
    const wrappedTpl = WRAPPER_TPL.trim().replace('ASSERTIONS', tpl);
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
    return isImplicitValue(this._left) || isImplicitValue(this._right);
  }
};

function isImplicitValue(node) {
  return !t.isLiteral(node);
}
