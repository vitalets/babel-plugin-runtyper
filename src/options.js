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

exports.create = function (passedOpts) {
  const options = Object.assign({}, defaults);
  Object.keys(passedOpts).forEach(key => {
    const value = passedOpts[key];
    assert.ok(defaults.hasOwnProperty(key), `Unknown Runtyper option name: ${key}`);
    assert.strictEqual(typeof defaults[key], typeof value,
      `Incorrect Runtyper option type: ${key} ${value} (${typeof value})`
    );
    const isIncorrectLevel = typeof value === 'string' && levels.indexOf(value) === -1;
    assert(!isIncorrectLevel, `Incorrect Runtyper level value: ${key} = ${value}`);
    if (value !== undefined) {
      options[key] = value;
    }
  });
  return options;
};
