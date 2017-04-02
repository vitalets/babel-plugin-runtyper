'use strict';

exports.square = function (n) {
  return function multiply(a, b) {
    var t = function (v) {
      if (v === null || v === undefined) return String(v);
      if (v !== v) return 'NaN';
      var tv = typeof v;
      return tv === 'object' ? (v.constructor && v.constructor.name || tv).toLowerCase() : tv;
    };

    var s = function (v, tv) {
      if (tv === 'null' || tv === 'undefined' || tv === 'NaN') return tv;
      var s = String(v);

      try {
        s = JSON.stringify(v);
      } catch (e) {}

      s = s.length > 20 ? s.substr(0, 20) + '...' : s;
      return s + ' (' + tv + ')';
    };

    var ta = t(a);
    var tb = t(b);
    var msg = '';

    if (ta !== 'number' || tb !== 'number') {
      msg = 'Numeric operation with non-numeric value';
    }

    if (msg) {
      msg += ': ' + s(a, ta) + ' ' + '*' + ' ' + s(b, tb);
      console.warn(new Error(msg));
    }

    return a * b;
  }(n, n);
};

//# sourceMappingURL=app.instrumented.js.map