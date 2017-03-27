
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

/*

const binaryTplString = `
  (function NAME(a, b) {
    ASSERTION
    return RESULT;
  })(PARAM1, PARAM2)
`;

const strictCompareTpl = template(binaryTplString.replace('ASSERTION', `
  if (typeof a !== typeof b) {
    var f = ${valueInfo};
    throw new Error('Strict compare of different types: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`.trim()));

const numericTpl = template(`
  if (typeof a !== 'number' || typeof b !== 'number') {
    var f = ${valueInfo};
    throw new Error('Numeric operation with non-numeric values: ' + f(a) + ' ' + OPERATOR + ' ' + f(b));
  }
`);

const plusTpl = template(`
  (function NAME(a, b) {
    if (typeof a !== typeof b || typeof a !== 'number' || typeof a !== 'string') {
      var f = ${valueInfo};
      throw new Error('Plus operation with invalid types: ' + f(a) + ' + ' + f(b));
    }
    return RESULT;
  })(PARAM1, PARAM2)
`);


function replace3(t, path) {
  const replacement = numericTpl({
    NAME: t.identifier('abc'),
    OPERATOR: t.stringLiteral(path.node.operator),
    PARAM1: path.node.left,
    PARAM2: path.node.right,
    RESULT: t.binaryExpression(path.node.operator, t.identifier('a'), t.identifier('b'))
  });
  path.replaceWith(replacement);
  path.skip();
  // const replacement = generate(ast.expression);
  // console.log(replacement);
  //process.exit()
}


function replace2(t, path) {
  const replacement = strictCompareTpl({
    NAME: t.identifier('abc'),
    OPERATOR: t.stringLiteral(path.node.operator),
    PARAM1: path.node.left,
    PARAM2: path.node.right,
    RESULT: t.binaryExpression(path.node.operator, t.identifier('a'), t.identifier('b'))
  });
  path.replaceWith(replacement);
  path.skip();
  // const replacement = generate(ast.expression);
  // console.log(replacement);
  //process.exit()
}



function replace(t, path) {
  const a = t.identifier('a');
  const b = t.identifier('b');

  const typeofA = t.unaryExpression('typeof', a);
  const typeofB = t.unaryExpression('typeof', b);
  const _compare = t.binaryExpression('!==', typeofA, typeofB);

  const msg1 = t.binaryExpression('+', t.stringLiteral(`Strict compare of different types: `), typeofA);
  const msg2 = t.binaryExpression('+', t.stringLiteral(` ${path.node.operator} `), typeofB);

  const msg = t.binaryExpression('+', msg1, msg2);
  const error = t.newExpression(t.identifier('Error'), [msg]);
  const _throw = t.throwStatement(error);
  const _checkTypes = t.ifStatement(_compare, _throw);
  const _return = t.returnStatement(t.binaryExpression('===', a, b));

  const statements = [
    _checkTypes,
    _return
  ];
  const body = t.blockStatement(statements);
  const fn = t.functionExpression(t.identifier('strictEqual'), [a, b], body);
  const fnCall = t.callExpression(fn, [path.node.left, path.node.right]);

  path.replaceWith(
    //t.binaryExpression('==', path.node.left, path.node.right)
    fnCall
  );

  path.skip();
}
*/
