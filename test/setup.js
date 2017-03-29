
const path = require('path');
const babel = require('babel-core');
const utils = require('../src/utils');

global.assert = require('chai').assert;

global.getFn = function (str, pluginOptions) {
  const relPath = './src/index.js';
  const plugins = [
    [relPath, pluginOptions]
  ];
  delete require.cache[path.resolve(relPath)];
  const fnBody = babel.transform(str, {plugins}).code;
  return new Function('x', 'y', `return ${fnBody}`);
};

global.getMsgFn = tpl => {
  return (x, y) => tpl.replace('{x}', utils.valueInfo(x)).replace('{y}', utils.valueInfo(y));
};

global.getWarnFn = tpl => {
  return (f, x, y, customMsg) => () => {
    const msg = customMsg || getMsgFn(tpl)(x, y);
    const spy = consoleSpy('warn');
    f(x, y);
    assert.equal(spy.getMessage(), msg);
  };
};

global.doesNotWarn = (f, x, y) => () => {
  const spy = consoleSpy('warn');
  f(x, y);
  assert.equal(spy.getMessage(), '');
};

global.consoleSpy = function (method) {
  const orig = console[method];
  let message = '';
  console[method] = e => message = e && e.message;
  return {
    getMessage: () => {
      console[method] = orig;
      return message;
    }
  };
};

