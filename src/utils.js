'use strict';

/* eslint-disable complexity, max-statements */

/**
 * Returns value info in form 'value (type)'
 *
 * @param {*} v value
 * @param {String} tv type of value
 * @returns {*}
 */
exports.valueInfo = function valueInfo(v, tv) {
  if (tv === 'null' || tv === 'undefined' || tv === 'NaN' || tv === 'Infinity') return tv;
  var s = '';
  try { s = JSON.stringify(v); } catch(e) { } // eslint-disable-line no-empty
  try { s = s || String(v); } catch(e) { } // eslint-disable-line no-empty
  s = s.length > 20 ? s.substr(0, 20) + '...' : s;
  return s + ' (' + tv + ')';
};

/**
 * Returns type of value
 *
 * @param {*} v
 * @param {Number} ct - customTypes: 1 (allow), 0 (deny)
 * @returns {String}
 */
exports.typeInfo = function typeInfo(v, ct) {
  if (v === null || v === undefined) return String(v);
  if (v !== v) return 'NaN';
  var tv = typeof v;
  if (tv === 'number' && !isFinite(v)) return 'Infinity';
  if (tv !== 'object') return tv;
  var c = v.constructor && v.constructor.name;
  if (!c) return tv;
  if (c === 'Object') c = 'object';
  if (ct) return c;
  var g = typeof global === 'object' ? global : (typeof window === 'object' ? window : null);
  var isNative = g && g[c] && /\{\s*\[native code\]\s*\}/.test(String(g[c]));
  return isNative ? c : tv;
};
