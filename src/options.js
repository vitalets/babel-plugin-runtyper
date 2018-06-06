'use strict';

const assert = require('assert');

const WARN_LEVELS = ['info', 'warn', 'error', 'break'];
const RULE_VALUES = ['allow', 'deny'];
const EXCLUDE_OPERATOR_VALUES = ['equal', 'numeric', 'add', 'relational'];
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
  excludeOperators: [],
  forbiddenNodeEnvs: ['production'],
};

exports.create = function (passedOpts) {
  const options = Object.assign({}, defaults);
  Object.keys(passedOpts).forEach(key => {
    const value = passedOpts[key];
    assertValues(key, value);
    if (value !== undefined) {
      options[key] = value;
    }
  });
  return options;
};

function assertValues(key, value) {
  assertRenamedOptions(key);
  assertName(key);
  assertType(key, value);
  assertWarnLevel(key, value);
  assertExclude(key, value);
  assertRules(key, value);
}

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

function assertExclude(key, excludeValues) {
  if (key === 'excludeOperators') {
    for(const value of excludeValues) {
      assert(EXCLUDE_OPERATOR_VALUES.indexOf(value) >= 0,
        `Incorrect Runtyper option value: ${key} = ${JSON.stringify(excludeValues)}, 
        possible values: ${JSON.stringify(EXCLUDE_OPERATOR_VALUES)}`
      );
    }
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
