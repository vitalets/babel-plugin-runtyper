'use strict';

const assertions = [
  require('./compare'),
  require('./numeric'),
  require('./add'),
];

module.exports = class BinaryAssertions {
  constructor(options) {
    this._assertions = options.enabled ? assertions.map(Assertion => new Assertion(options)) : [];
  }

  tryReplace(path) {
    for (let assertion of this._assertions) {
      if (assertion.tryReplace(path)) {
        break;
      }
    }
  }
};
