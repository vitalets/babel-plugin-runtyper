
exports.valueInfo = function (v) {
  if ([null, undefined].indexOf(v) >= 0) return String(v);
  var s = String(v);
  try { s = JSON.stringify(v) } catch(e) { }
  s = s.length > 10 ? s.substr(0, 10) + '...' : s;
  return s + ' (' + typeof v + ')';
};

