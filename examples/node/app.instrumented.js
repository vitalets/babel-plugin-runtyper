'use strict';

exports.square = function (n) {
  return function multiply(a, b) {
    var t = function (v, ct) {
      if (v === null || v === undefined) return String(v);
      if (v !== v) return 'NaN';
      var tv = typeof v;
      if (tv !== 'object') return tv;
      var c = v.constructor && v.constructor.name;
      if (!c) return tv;
      if (c === 'Object') c = 'object';
      if (ct) return c;
      var g = global || window;
      var isNative = g && /\{\s*\[native code\]\s*\}/.test(String(g[c]));
      return isNative ? c : tv;
    };

    var ta = t(a, 0);
    var tb = t(b, 0);
    var msg = '';
    var lta = ta.toLowerCase();
    var ltb = tb.toLowerCase();

    if (lta !== 'number' || ltb !== 'number') {
      msg = 'Numeric operation with non-numeric value';
    }

    if (msg) {
      var s = function (v, tv) {
        if (tv === 'null' || tv === 'undefined' || tv === 'NaN') return tv;
        var s = '';

        try {
          s = JSON.stringify(v);
        } catch (e) {}

        try {
          s = s || String(v);
        } catch (e) {}

        s = s.length > 20 ? s.substr(0, 20) + '...' : s;
        return s + ' (' + tv + ')';
      };

      msg += ': ' + s(a, ta) + ' ' + '*' + ' ' + s(b, tb);
      console.warn(new Error(msg));
    }

    return a * b;
  }(n, n);
};

//# sourceMappingURL=app.instrumented.js.map