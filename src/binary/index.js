'use strict';

const assertions = {
  equal: require('./equal'),
  numeric : require('./numeric'),
  add: require('./add'),
  relational: require('./relational'),
};

function isExcluded(options, operator) {
  return options.excludeOperators.indexOf(operator) >= 0;
}


module.exports = class BinaryAssertions {
  constructor(options) {
    this._assertions = [];
    for (const operator of Object.keys(assertions)) {
      const Assertion = assertions[operator];
      if (options.enabled && !isExcluded(options, operator)) {
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
