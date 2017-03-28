'use strict';

/*eslint no-empty: 0*/

exports.valueInfo = function (v) {
  if ([null, undefined].indexOf(v) >= 0) return String(v);
  var s = String(v);
  try { s = JSON.stringify(v); } catch(e) { }
  s = s.length > 20 ? s.substr(0, 20) + '...' : s;
  return s + ' (' + typeof v + ')';
};

