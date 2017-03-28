'use strict';

const assertions = [
  require('./compare'),
  require('./numeric'),
  require('./plus'),
];

module.exports = class BinaryAssertions {
  constructor(options) {
    this._enabled = options.enabled;
    this._assertions = this._enabled ? assertions.map(Assertion => new Assertion(options)) : [];
  }

  get enabled() {
    return this._enabled;
  }

  tryReplace(path) {
    for (let assertion of this._assertions) {
      if (assertion.tryReplace(path)) {
        break;
      }
    }
  }
};
