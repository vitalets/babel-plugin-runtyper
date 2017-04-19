'use strict';

const assert = require('assert');

const WARN_LEVELS = ['info', 'warn', 'error', 'break'];
const RULE_VALUES = ['allow', 'deny'];
const RULE_NAME_REG = /^(implicit|explicit)/;

const defaults = {
  enabled: true,
  warnLevel: 'warn',
  implicitAddStringNumber: 'deny',
  explicitAddEmptyString: 'deny',
  implicitEqualNull: 'deny',
  implicitEqualUndefined: 'deny',
  implicitEqualCustomTypes: 'deny',
  explicitEqualTrue: 'deny',
  explicitEqualFalse: 'deny',
};

exports.create = function (passedOpts) {
  const options = Object.assign({}, defaults);
  Object.keys(passedOpts).forEach(key => {
    const value = passedOpts[key];
    assertRenamedOptions(key);
    assertName(key);
    assertType(key, value);
    assertWarnLevel(key, value);
    assertRules(key, value);
    if (value !== undefined) {
      options[key] = value;
    }
  });
  warnIfProduction(options);
  return options;
};

function assertName(key) {
  assert(defaults.hasOwnProperty(key), `Unknown Runtyper option name: ${key}`);
}

function assertType(key, value) {
  assert.strictEqual(typeof defaults[key], typeof value,
    `Incorrect Runtyper option type: ${key} ${value} (${typeof value})`
  );
}

function assertWarnLevel(key, value) {
  if (key === 'warnLevel') {
    assert(WARN_LEVELS.indexOf(value) >= 0,
      `Incorrect Runtyper option value: ${key} = ${value}, possible values: ${WARN_LEVELS}`
    );
  }
}

function assertRules(key, value) {
  if (RULE_NAME_REG.test(key)) {
    assert(RULE_VALUES.indexOf(value) >= 0,
      `Incorrect Runtyper option value: ${key} = ${value}, possible values: ${RULE_VALUES}`
    );
  }
}

function assertRenamedOptions(key) {
  if (key === 'strictCompareNull') {
    throw new Error('"strictCompareNull" was renamed to "implicitEqualNull"');
  }

  if (key === 'strictCompareUndefined') {
    throw new Error('"strictCompareUndefined" was renamed to "implicitEqualUndefined"');
  }

  if (key === 'concatStringNumber') {
    throw new Error('"concatStringNumber" was renamed to "implicitAddStringNumber"');
  }

  if (key === 'defaultLevel') {
    throw new Error('"defaultLevel" was renamed to "warnLevel"');
  }
}

function warnIfProduction(options) {
  if (options.enabled && process.env.NODE_ENV === 'production') {
    console.log('WARNING: you are using Runtyper in production build!');  // eslint-disable-line no-console
  }
}
