'use strict';

const assert = require('chai').assert;
const babel = require('babel-standalone');
const runtyper = require('../src');
const utils = require('../src/utils');

global.assert = assert;
babel.registerPlugin('babel-plugin-runtyper', runtyper);

global.getFn = function (str, pluginOptions) {
  const plugins = [
    ['babel-plugin-runtyper', pluginOptions]
  ];
  const fnBody = babel.transform(str, {plugins}).code;
  return new Function('x', 'y', `return ${fnBody}`);
};

global.getMsgFn = tpl => {
  return (x, y) => {
    return tpl
      .replace('{x}', utils.valueInfo(x, utils.typeInfo(x)))
      .replace('{y}', utils.valueInfo(y, utils.typeInfo(y)));
  };
};

global.getWarnFn = tpl => {
  return (f, x, y, customMsg) => {
    const msg = customMsg || getMsgFn(tpl)(x, y);
    const spy = consoleSpy('warn');
    f(x, y);
    assert.equal(spy.getMessage(), msg);
  };
};

global.doesNotWarn = (f, x, y) => {
  const spy = consoleSpy('warn');
  f(x, y);
  assert.equal(spy.getMessage(), '');
};

global.consoleSpy = function (method) {
  const orig = console[method];
  let message = '';
  console[method] = e => message = typeof e === 'string' ? e : e.message;
  return {
    getMessage: () => {
      console[method] = orig;
      return message;
    }
  };
};

