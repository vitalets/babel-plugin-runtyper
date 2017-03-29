'use strict';

const t = require('babel-types');
const template = require('babel-template');
const utils = require('../utils');

const WRAPPER_TPL = `
  (function NAME(a, b) {
    ASSERTION
    return RESULT;
  })(PARAM1, PARAM2)
`;

module.exports = class BaseBinaryAssertion {
  constructor(options, operators, tpl) {
    this._options = options;
    this._operators = operators;
    this._tpl = this._compileTpl(tpl);
  }

  tryReplace(path) {
    this._setPath(path);
    if (this._needReplace()) {
      this._replace();
      return true;
    }
  }

  _setPath(path) {
    this._path = path;
    this._operator = this._path.node.operator;
    this._left = this._path.node.left;
    this._right = this._path.node.right;
  }

  _needReplace() {
    return this._operators.hasOwnProperty(this._operator);
  }

  _replace() {
    const replacement = this._tpl({
      NAME: t.identifier(this._getFunctionName()),
      OPERATOR: t.stringLiteral(this._operator),
      PARAM1: this._path.node.left,
      PARAM2: this._path.node.right,
      RESULT: t.binaryExpression(this._operator, t.identifier('a'), t.identifier('b'))
    });
    this._path.replaceWith(replacement);
    this._path.skip();
  }

  _getFunctionName() {
    return this._operators[this._operator];
  }

  _compileTpl(tpl) {
    tpl = tpl.trim().replace('VALUE_INFO', utils.valueInfo.toString());
    const wrappedTpl = WRAPPER_TPL.trim().replace('ASSERTION', tpl);
    return template(wrappedTpl);
  }
};
