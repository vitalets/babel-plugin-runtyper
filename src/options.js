'use strict';

const assert = require('assert');

const levels = ['allow', 'warn', 'error', 'break'];

const defaults = {
  enabled: true,
  defaultLevel: 'warn',
  implicitAddStringNumber: '',
  explicitAddEmptyString: '',
  implicitCompareNull: '',
  implicitCompareUndefined: '',
  explicitCompareTrue: '',
  explicitCompareFalse: '',
};

exports.create = function (passedOpts) {
  const options = Object.assign({}, defaults);
  Object.keys(passedOpts).forEach(key => {
    const value = passedOpts[key];
    assertRenamedOptions(key);
    assert(defaults.hasOwnProperty(key), `Unknown Runtyper option name: ${key}`);
    assertType(key, value);
    const isIncorrectLevel = typeof value === 'string' && levels.indexOf(value) === -1;
    assert(!isIncorrectLevel, `Incorrect Runtyper level value: ${key} = ${value}`);
    if (value !== undefined) {
      options[key] = value;
    }
  });
  return options;
};

function assertType(key, value) {
  assert.strictEqual(typeof defaults[key], typeof value,
    `Incorrect Runtyper option type: ${key} ${value} (${typeof value})`
  );
}

function assertRenamedOptions(key) {
  if (key === 'strictCompareNull') {
    throw new Error('"strictCompareNull" was renamed to "implicitCompareNull"');
  }

  if (key === 'strictCompareUndefined') {
    throw new Error('"strictCompareUndefined" was renamed to "implicitCompareUndefined"');
  }

  if (key === 'concatStringNumber') {
    throw new Error('"concatStringNumber" was renamed to "implicitAddStringNumber"');
  }
}
