'use strict';

const equal = require('./equal');
const numeric = require('./numeric');
const add = require('./add');
const relational = require('./relational');


const ASSERTION_TO_EXCLUDE_OPTION_NAME = {
  [equal.name]: 'equal',
  [numeric.name]: 'numeric',
  [add.name]: 'add',
  [relational.name]: 'relational'
};

function isExcluded(options, Assertion) {
  return options.exclude.indexOf(ASSERTION_TO_EXCLUDE_OPTION_NAME[Assertion.name]) >= 0;
}


const assertions = [
  equal,
  numeric,
  add,
  relational
];

module.exports = class BinaryAssertions {
  constructor(options) {
    this._assertions = [];
    for (let Assertion of assertions) {
      if (options.enabled && !isExcluded(options, Assertion)) {
        this._assertions.push(new Assertion(options));
      }
    }
  }

  tryReplace(path) {
    for (let assertion of this._assertions) {
      if (assertion.tryReplace(path)) {
        return true;
      }
    }
  }
};
