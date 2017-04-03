'use strict';

/* eslint-disable complexity, max-statements */

exports.valueInfo = function (v, tv) {
  if (tv === 'null' || tv === 'undefined' || tv === 'NaN') return tv;
  var s = String(v);
  try {
    var st = JSON.stringify(v);
    s = st || s;
  } catch(e) { } // eslint-disable-line no-empty
  s = s.length > 20 ? s.substr(0, 20) + '...' : s;
  return s + ' (' + tv + ')';
};

exports.typeInfo = function (v, ct) {
  if (v === null || v === undefined) return String(v);
  if (v !== v) return 'NaN';
  var tv = typeof v;
  if (tv !== 'object') return tv;
  var c = v.constructor && v.constructor.name;
  if (!c) return tv;
  var cv = c.toLowerCase();
  if (ct) return cv;
  var g = global || window;
  var isNative = g && /\{\s*\[native code\]\s*\}/.test(String(g[c]));
  return isNative ? cv : tv;
};
