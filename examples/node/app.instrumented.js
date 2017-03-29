exports.square = function (n) {
  return function multiply(a, b) {
    var f = function (v) {
      if ([null, undefined].indexOf(v) >= 0) return String(v);
      var s = String(v);

      try {
        s = JSON.stringify(v);
      } catch (e) {}

      s = s.length > 20 ? s.substr(0, 20) + '...' : s;
      return s + ' (' + typeof v + ')';
    };

    if (typeof a !== 'number' || typeof b !== 'number') {
      console.warn(new Error('Numeric operation with non-numeric value: ' + f(a) + ' ' + "*" + ' ' + f(b)));
    }

    return a * b;
  }(n, n);
};

//# sourceMappingURL=app.instrumented.js.map