
const babel = require('babel-core');
const utils = require('../src/utils');

global.assert = require('chai').assert;

global.getFn = function (str, pluginOptions = {}) {
  const plugins = [
    ['./src/index.js', pluginOptions]
  ];
  const fnBody = babel.transform(str, {plugins}).code;
  return new Function('x', 'y', `return ${fnBody}`);
};

global.getMsgFn = tpl => {
  return (x, y) => tpl.replace('{x}', utils.valueInfo(x)).replace('{y}', utils.valueInfo(y));
};

global.getThrows = tpl => {
  return (f, x, y, customMsg) => () => {
    const msg = customMsg || getMsgFn(tpl)(x, y);
    assert.throws(() => f(x, y), msg);
  };
};

global.doesNotThrow = (f, x, y) => () => assert.doesNotThrow(() => f(x, y));
