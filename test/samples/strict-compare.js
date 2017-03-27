
exports.equalVars = function (x, y) {
  return x === y;
};

exports.equalFnMethod = function (x, y) {
  return x() === y.toString();
};

exports.equalNumber = function (x) {
  return x === 1;
};

exports.equalString = function (x) {
  return x === '1';
};

exports.equalBoolean = function (x) {
  return x === true;
};

exports.equalNull = function (x) {
  return x === null;
};

exports.equalUndefined = function (x) {
  return x === undefined;
};

exports.notEqualVars = function (x, y) {
  return x !== y;
};
