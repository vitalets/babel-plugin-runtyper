'use strict';

/* eslint-disable complexity */

exports.valueInfo = function (v, tv) {
  if (tv === 'null' || tv === 'undefined' || tv === 'NaN') return tv;
  var s = String(v);
  try { s = JSON.stringify(v); } catch(e) { } // eslint-disable-line no-empty
  s = s.length > 20 ? s.substr(0, 20) + '...' : s;
  return s + ' (' + tv + ')';
};

exports.typeInfo = function (v) {
  if (v === null || v === undefined) return String(v);
  if (v !== v) return 'NaN';
  var tv = typeof v;
  return tv === 'object' ? (v.constructor && v.constructor.name || tv).toLowerCase() : tv;
};
