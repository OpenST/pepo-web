/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 340);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcz85NzBiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _this = undefined;\n\n//Only Required client side\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (ns_string) {\n  console.log(\"NS++\", _this, window);\n  var parts = ns_string && ns_string.split('.'),\n      parent = window || {},\n      pl,\n      i;\n  pl = parts.length;\n\n  for (i = 0; i < pl; i++) {\n    //create a property if it doesn't exist\n    if (typeof parent[parts[i]] == 'undefined') {\n      parent[parts[i]] = {};\n    }\n\n    parent = parent[parts[i]];\n  }\n\n  return parent;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2xpYnMvbmFtZXNwYWNlLmpzP2E3MzciXSwibmFtZXMiOlsibnNfc3RyaW5nIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsInBhcnRzIiwic3BsaXQiLCJwYXJlbnQiLCJwbCIsImkiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBRWUseUVBQUNBLFNBQUQsRUFBZTtBQUMxQkMsU0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFxQixLQUFyQixFQUE0QkMsTUFBNUI7QUFDQSxNQUFJQyxLQUFLLEdBQUdKLFNBQVMsSUFBSUEsU0FBUyxDQUFDSyxLQUFWLENBQWdCLEdBQWhCLENBQXpCO0FBQUEsTUFDRUMsTUFBTSxHQUFHSCxNQUFNLElBQUksRUFEckI7QUFBQSxNQUVFSSxFQUZGO0FBQUEsTUFFTUMsQ0FGTjtBQUlBRCxJQUFFLEdBQUdILEtBQUssQ0FBQ0ssTUFBWDs7QUFDQSxPQUFLRCxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdELEVBQWhCLEVBQW9CQyxDQUFDLEVBQXJCLEVBQXlCO0FBQ3ZCO0FBQ0EsUUFBSSxPQUFPRixNQUFNLENBQUNGLEtBQUssQ0FBQ0ksQ0FBRCxDQUFOLENBQWIsSUFBMkIsV0FBL0IsRUFBNEM7QUFDMUNGLFlBQU0sQ0FBQ0YsS0FBSyxDQUFDSSxDQUFELENBQU4sQ0FBTixHQUFtQixFQUFuQjtBQUNEOztBQUVERixVQUFNLEdBQUdBLE1BQU0sQ0FBQ0YsS0FBSyxDQUFDSSxDQUFELENBQU4sQ0FBZjtBQUNEOztBQUVELFNBQU9GLE1BQVA7QUFDSCxDQWpCRCIsImZpbGUiOiIxNDQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL09ubHkgUmVxdWlyZWQgY2xpZW50IHNpZGVcblxuZXhwb3J0IGRlZmF1bHQgKG5zX3N0cmluZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiTlMrK1wiICwgdGhpcywgIHdpbmRvdyk7XG4gICAgdmFyIHBhcnRzID0gbnNfc3RyaW5nICYmIG5zX3N0cmluZy5zcGxpdCgnLicpLFxuICAgICAgcGFyZW50ID0gd2luZG93IHx8IHt9LFxuICAgICAgcGwsIGk7XG5cbiAgICBwbCA9IHBhcnRzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgcGw7IGkrKykge1xuICAgICAgLy9jcmVhdGUgYSBwcm9wZXJ0eSBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICBpZiAodHlwZW9mIHBhcmVudFtwYXJ0c1tpXV0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyZW50W3BhcnRzW2ldXSA9IHt9O1xuICAgICAgfVxuXG4gICAgICBwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcGFyZW50O1xufTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///144\n");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

eval("module.exports = jQuery;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIj9jZDBjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_libs_namespace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);\n\n\n\n\n\nvar WebView = function WebView() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, WebView);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"sanitizeUrl\", function (url) {\n    if (url.indexOf('lerr') !== -1) {\n      url = url.replace(/(\\?|&)+lerr=1/gi, ' ');\n    }\n\n    return url;\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"init\", function (params) {\n    var data = JSON.parse(params.oAuthData),\n        kind = params.oAuthKind,\n        redirectUrl = _this.sanitizeUrl(params.redirectUrl);\n\n    if (!data || !redirectUrl) return;\n    jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({\n      url: \"/api/web/auth/\".concat(kind, \"/login\"),\n      method: 'POST',\n      data: data,\n      success: function success(res) {\n        window.location = redirectUrl;\n        console.log(\"success redirect ajax\", JSON.stringify(res));\n      },\n      error: function error(err) {\n        if (redirectUrl.indexOf('?') !== -1) {\n          window.location = \"\".concat(redirectUrl, \"&lerr=1\");\n        } else {\n          window.location = \"\".concat(redirectUrl, \"?lerr=1\");\n        }\n\n        console.log(\"error redirect ajax\");\n      }\n    });\n  });\n};\n\nvar pepo = Object(_src_libs_namespace__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"pepo\");\npepo.webView = new WebView();\n/* harmony default export */ __webpack_exports__[\"default\"] = (pepo.webView);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL3dlYlZpZXcuanM/NTI2YSJdLCJuYW1lcyI6WyJXZWJWaWV3IiwidXJsIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJwYXJhbXMiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwib0F1dGhEYXRhIiwia2luZCIsIm9BdXRoS2luZCIsInJlZGlyZWN0VXJsIiwic2FuaXRpemVVcmwiLCIkIiwiYWpheCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmdpZnkiLCJlcnJvciIsImVyciIsInBlcG8iLCJucyIsIndlYlZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVNQSxPOzs7OztvR0FFVSxVQUFFQyxHQUFGLEVBQVc7QUFDdkIsUUFBSUEsR0FBRyxDQUFDQyxPQUFKLENBQVksTUFBWixNQUF3QixDQUFDLENBQTdCLEVBQWdDO0FBQzlCRCxTQUFHLEdBQUdBLEdBQUcsQ0FBQ0UsT0FBSixDQUFZLGlCQUFaLEVBQStCLEdBQS9CLENBQU47QUFDRDs7QUFDRCxXQUFPRixHQUFQO0FBQ0QsRzs7NkZBRUssVUFBQ0csTUFBRCxFQUFXO0FBQ2IsUUFBSUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsTUFBTSxDQUFDSSxTQUFsQixDQUFYO0FBQUEsUUFDRUMsSUFBSSxHQUFHTCxNQUFNLENBQUNNLFNBRGhCO0FBQUEsUUFFRUMsV0FBVyxHQUFHLEtBQUksQ0FBQ0MsV0FBTCxDQUFpQlIsTUFBTSxDQUFDTyxXQUF4QixDQUZoQjs7QUFHQSxRQUFHLENBQUNOLElBQUQsSUFBUyxDQUFDTSxXQUFiLEVBQTBCO0FBQzFCRSxpREFBQyxDQUFDQyxJQUFGLENBQU87QUFDTGIsU0FBRywwQkFBa0JRLElBQWxCLFdBREU7QUFFTE0sWUFBTSxFQUFDLE1BRkY7QUFHTFYsVUFBSSxFQUFFQSxJQUhEO0FBSUxXLGFBQU8sRUFBQyxpQkFBVUMsR0FBVixFQUFlO0FBQ3JCQyxjQUFNLENBQUNDLFFBQVAsR0FBa0JSLFdBQWxCO0FBQ0FTLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaLEVBQXFDZixJQUFJLENBQUNnQixTQUFMLENBQWVMLEdBQWYsQ0FBckM7QUFDRCxPQVBJO0FBUUxNLFdBQUssRUFBRyxlQUFVQyxHQUFWLEVBQWU7QUFDckIsWUFBR2IsV0FBVyxDQUFDVCxPQUFaLENBQW9CLEdBQXBCLE1BQTZCLENBQUMsQ0FBakMsRUFBbUM7QUFDakNnQixnQkFBTSxDQUFDQyxRQUFQLGFBQXFCUixXQUFyQjtBQUNELFNBRkQsTUFFTztBQUNMTyxnQkFBTSxDQUFDQyxRQUFQLGFBQXFCUixXQUFyQjtBQUNEOztBQUNEUyxlQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNEO0FBZkksS0FBUDtBQWlCSCxHOzs7QUFHSCxJQUFNSSxJQUFJLEdBQUdDLG1FQUFFLENBQUMsTUFBRCxDQUFmO0FBQ0FELElBQUksQ0FBQ0UsT0FBTCxHQUFlLElBQUkzQixPQUFKLEVBQWY7QUFFZXlCLG1FQUFJLENBQUNFLE9BQXBCIiwiZmlsZSI6IjM0MC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgIG5zIGZyb20gXCIuLi9zcmMvbGlicy9uYW1lc3BhY2VcIjtcblxuY2xhc3MgV2ViVmlldyB7XG4gIFxuICBzYW5pdGl6ZVVybCA9ICggdXJsICkgPT4ge1xuICAgIGlmKCB1cmwuaW5kZXhPZignbGVycicpICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnJlcGxhY2UoLyhcXD98JikrbGVycj0xL2dpLCAnICcpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuICBcbiAgaW5pdCA9KHBhcmFtcyk9PiB7XG4gICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocGFyYW1zLm9BdXRoRGF0YSksXG4gICAgICAgIGtpbmQgPSBwYXJhbXMub0F1dGhLaW5kLFxuICAgICAgICByZWRpcmVjdFVybCA9IHRoaXMuc2FuaXRpemVVcmwocGFyYW1zLnJlZGlyZWN0VXJsKTtcbiAgICAgIGlmKCFkYXRhIHx8ICFyZWRpcmVjdFVybCkgcmV0dXJuO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOmAvYXBpL3dlYi9hdXRoLyR7a2luZH0vbG9naW5gLFxuICAgICAgICBtZXRob2Q6J1BPU1QnLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSByZWRpcmVjdFVybDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgcmVkaXJlY3QgYWpheFwiLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaWYocmVkaXJlY3RVcmwuaW5kZXhPZignPycpICE9PSAtMSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBgJHtyZWRpcmVjdFVybH0mbGVycj0xYDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYCR7cmVkaXJlY3RVcmx9P2xlcnI9MWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgcmVkaXJlY3QgYWpheFwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxufVxuXG5jb25zdCBwZXBvID0gbnMoXCJwZXBvXCIpO1xucGVwby53ZWJWaWV3ID0gbmV3IFdlYlZpZXcoKTtcblxuZXhwb3J0IGRlZmF1bHQgcGVwby53ZWJWaWV3O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///340\n");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcz85NTIzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5\n");

/***/ })

/******/ });