/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function square(n) {
  return function multiply(a, b) {
    var t = function typeInfo(v, ct) {
      if (v === null || v === undefined) return String(v);
      if (v !== v) return 'NaN';
      var tv = typeof v;
      if (tv === 'number' && !isFinite(v)) return 'Infinity';
      if (tv !== 'object') return tv;
      var c = v.constructor && v.constructor.name;
      if (!c) return tv;
      if (c === 'Object') c = 'object';
      if (ct) return c;
      var g = typeof global === 'object' ? global : typeof window === 'object' ? window : null;
      var isNative = g && g[c] && /\{\s*\[native code\]\s*\}/.test(String(g[c]));
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
      var s = function valueInfo(v, tv) {
        if (tv === 'null' || tv === 'undefined' || tv === 'NaN' || tv === 'Infinity') return tv;
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
}

window.document.getElementById('username').addEventListener('change', function (event) {
  square(event.target.value);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map