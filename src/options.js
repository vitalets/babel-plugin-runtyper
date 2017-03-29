'use strict';

const assert = require('assert');

const levels = ['allow', 'warn', 'error', 'break'];

const defaults = {
  enabled: true,
  defaultLevel: 'warn',
  concatStringNumber: '',
  strictCompareNull: '',
  strictCompareUndefined: '',
};

let opts = {};

exports.create = function (passedOpts) {
  opts = Object.assign({}, defaults);
  Object.keys(passedOpts).forEach(key => {
    const value = passedOpts[key];
    assert.ok(defaults.hasOwnProperty(key), `Unknown Runtyper option name: ${key}`);
    assert.strictEqual(typeof defaults[key], typeof value,
      `Incorrect Runtyper option type: ${key} ${value} (${typeof value})`
    );
    const isIncorrectLevel = typeof value === 'string' && levels.indexOf(value) === -1;
    assert(!isIncorrectLevel, `Incorrect Runtyper level value: ${key} = ${value}`);
    if (value !== undefined) {
      opts[key] = value;
    }
  });
  return opts;
};

exports.isEnabled = function () {
  return opts.enabled;
};

exports.getDefaultLevel = function () {
  return opts.defaultLevel;
};
