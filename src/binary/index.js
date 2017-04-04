'use strict';

const assertions = [
  require('./equal'),
  require('./numeric'),
  require('./add'),
  require('./relational'),
];

module.exports = class BinaryAssertions {
  constructor(options) {
    this._assertions = options.enabled ? assertions.map(Assertion => new Assertion(options)) : [];
  }

  tryReplace(path) {
    for (let assertion of this._assertions) {
      if (assertion.tryReplace(path)) {
        return true;
      }
    }
  }
};
