'use strict';

const assertions = {
  equal: require('./equal'),
  numeric : require('./numeric'),
  add: require('./add'),
  relational: require('./relational'),
};

module.exports = class BinaryAssertions {
  constructor(options) {
    this._assertions = [];
    this._options = options;
    if (options.enabled) {
      this._fillAssertions();
    }
  }

  _fillAssertions() {
    for (const operator of Object.keys(assertions)) {
      const Assertion = assertions[operator];
      if (!this._isExcluded(operator)) {
        this._assertions.push(new Assertion(this._options));
      }
    }
  }

  _isExcluded(operator) {
    return this._options.excludeOperators.indexOf(operator) >= 0;
  }

  tryReplace(path) {
    for (let assertion of this._assertions) {
      if (assertion.tryReplace(path)) {
        return true;
      }
    }
  }
};
